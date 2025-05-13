"use client";

import type { CareerSuggestionOutput } from '@/ai/flows/generate-career-suggestions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, DollarSign, FileText, ListChecks, Brain, TrendingUp } from "lucide-react";

interface CareerResultsProps {
  results: CareerSuggestionOutput | null;
}

export function CareerResults({ results }: CareerResultsProps) {
  if (!results || !results.suggestions || results.suggestions.length === 0) {
    return (
      <div className="text-center py-10">
        <Brain size={64} className="mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No Suggestions Available</h2>
        <p className="text-muted-foreground">
          We couldn't find any career suggestions based on the provided information. <br />
          Please try adjusting your input or starting over.
        </p>
      </div>
    );
  }

  return (
    <div id="printable-area">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary printable-title">
        Your Personalized Career Suggestions
        <TrendingUp className="inline-block ml-2 h-8 w-8" />
      </h2>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {results.suggestions.map((suggestion, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 card-print">
            <CardHeader>
              <CardTitle className="flex items-center text-xl md:text-2xl text-accent printable-title">
                <Briefcase className="mr-3 h-7 w-7" />
                {suggestion.career}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 printable-text">
              <div>
                <h4 className="font-semibold text-md flex items-center mb-1">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Description:
                </h4>
                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
              </div>
              <div>
                <h4 className="font-semibold text-md flex items-center mb-1">
                  <ListChecks className="mr-2 h-5 w-5 text-primary" />
                  Qualifications:
                </h4>
                <p className="text-sm text-muted-foreground">{suggestion.qualifications}</p>
              </div>
              <div>
                <h4 className="font-semibold text-md flex items-center mb-1">
                  <DollarSign className="mr-2 h-5 w-5 text-primary" />
                  Salary Range:
                </h4>
                <Badge variant="secondary" className="text-sm">{suggestion.salaryRange}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
