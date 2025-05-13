"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useResults } from '@/context/results-context';
import { CareerResults } from '@/components/career-results';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ResultsPage() {
  const router = useRouter();
  const { results, isLoading, setResults, setIsLoading } = useResults();
  const { toast } = useToast();

  useEffect(() => {
    // If there are no results and not loading, redirect to home.
    // This handles direct navigation to /results or page refresh after session storage clear.
    if (!isLoading && !results) {
      // Small delay to allow context to potentially load from session storage
      const timer = setTimeout(() => {
        if (!sessionStorage.getItem('careerCompassResults')) { // Check session storage directly before redirecting
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

  const handlePrint = () => {
    window.print();
  };

  const handleStartOver = () => {
    setResults(null); // Clear results from context and session storage
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

  // This check is important for when results become null after being set (e.g. start over)
  if (!results) {
     // This state could be hit briefly if redirection hasn't happened yet or after "Start Over"
     // A more robust loading/empty state can be here, or rely on the useEffect redirect.
     // For now, keep it minimal as useEffect should handle redirection.
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
        <Button onClick={handlePrint} variant="outline" size="lg" className="text-accent border-accent hover:bg-accent hover:text-accent-foreground">
          <Download className="mr-2 h-5 w-5" />
          Download as PDF
        </Button>
        <Button onClick={handleStartOver} variant="default" size="lg" className="bg-primary hover:bg-primary/90">
          <RotateCcw className="mr-2 h-5 w-5" />
          Start Over
        </Button>
      </div>
    </div>
  );
}
