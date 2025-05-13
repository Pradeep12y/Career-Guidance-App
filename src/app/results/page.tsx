"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useResults } from '@/context/results-context';
import { CareerResults } from '@/components/career-results';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResultsPage() {
  const router = useRouter();
  const { results, isLoading, setResults, setIsLoading } = useResults();
  const { toast } = useToast();
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  useEffect(() => {
    if (!isLoading && !results) {
      const timer = setTimeout(() => {
        if (!sessionStorage.getItem('careerCompassResults')) {
            toast({
                title: "No results found",
                description: "Redirecting to the homepage to start a new search.",
                variant: "default",
            });
            router.push('/');
        }
      }, 200); 
      return () => clearTimeout(timer);
    }
  }, [results, isLoading, router, toast]);

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    toast({
      title: "Generating PDF...",
      description: "Please wait while your PDF is being prepared.",
    });

    const printableArea = document.getElementById('printable-area');
    if (!printableArea) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not find printable content.",
      });
      setIsDownloadingPdf(false);
      return;
    }

    try {
      const canvas = await html2canvas(printableArea, { 
        scale: 2, // Improve resolution
        useCORS: true, // Important if there are external images/assets
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'p', // portrait
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // Calculate the aspect ratio of the image
      const aspectRatio = canvasWidth / canvasHeight;
      
      let imgRenderWidth = pdfWidth - 20; // pdfWidth with some margin
      let imgRenderHeight = imgRenderWidth / aspectRatio;

      // If the calculated height is greater than the PDF page height (minus margins),
      // then we need to scale based on height instead
      if (imgRenderHeight > pdfHeight - 20) { // pdfHeight with some margin
        imgRenderHeight = pdfHeight - 20;
        imgRenderWidth = imgRenderHeight * aspectRatio;
      }
      
      // Center the image on the PDF page
      const xOffset = (pdfWidth - imgRenderWidth) / 2;
      const yOffset = (pdfHeight - imgRenderHeight) / 2;

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgRenderWidth, imgRenderHeight);
      pdf.save('career-suggestions.pdf');
      
      toast({
        title: "PDF Downloaded",
        description: "Your career suggestions PDF has been downloaded.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: "destructive",
        title: "PDF Generation Failed",
        description: "An error occurred while generating the PDF. Please try again.",
      });
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleStartOver = () => {
    setResults(null); 
    setIsLoading(false);
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
        <h2 className="text-2xl font-semibold text-primary">Generating Your Career Path...</h2>
        <p className="text-muted-foreground mt-2">Our AI is working hard to find the best options for you. Please wait a moment.</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
         <p className="text-muted-foreground mt-2">Loading results or no results to display. You might be redirected shortly.</p>
      </div>
    );
  }
  

  return (
    <div className="py-8 md:py-12">
      <CareerResults results={results} />
      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 no-print">
        <Button 
          onClick={handleDownloadPdf} 
          variant="outline" 
          size="lg" 
          className="text-accent border-accent hover:bg-accent hover:text-accent-foreground"
          disabled={isDownloadingPdf}
        >
          {isDownloadingPdf ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 h-5 w-5" />
              Download as PDF
            </>
          )}
        </Button>
        <Button onClick={handleStartOver} variant="default" size="lg" className="bg-primary hover:bg-primary/90">
          <RotateCcw className="mr-2 h-5 w-5" />
          Start Over
        </Button>
      </div>
    </div>
  );
}
