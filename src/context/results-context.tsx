"use client";

import type { CareerSuggestionOutput } from '@/ai/flows/generate-career-suggestions';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ResultsContextType {
  results: CareerSuggestionOutput | null;
  setResults: (results: CareerSuggestionOutput | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

const SESSION_STORAGE_KEY = 'careerCompassResults';

export const ResultsProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResultsState] = useState<CareerSuggestionOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Load from session storage on initial mount
    try {
      const storedResults = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (storedResults) {
        setResultsState(JSON.parse(storedResults));
      }
    } catch (error) {
      console.error("Failed to parse results from session storage:", error);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
    setIsInitialized(true);
  }, []);

  const setResults = (newResults: CareerSuggestionOutput | null) => {
    setResultsState(newResults);
    if (isInitialized) { // Only save to session storage after initial load
      if (newResults) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newResults));
      } else {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
  };
  
  // Clear session storage if results are nullified after initialization
  useEffect(() => {
    if (isInitialized && results === null) {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [results, isInitialized]);


  return (
    <ResultsContext.Provider value={{ results, setResults, isLoading, setIsLoading }}>
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = (): ResultsContextType => {
  const context = useContext(ResultsContext);
  if (context === undefined) {
    throw new Error('useResults must be used within a ResultsProvider');
  }
  return context;
};
