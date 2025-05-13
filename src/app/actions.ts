"use server";

import { generateCareerSuggestions, type CareerSuggestionInput, type CareerSuggestionOutput } from '@/ai/flows/generate-career-suggestions';
import { CareerFormSchema, type CareerFormValues } from '@/types';

interface ActionResult {
  success: boolean;
  data?: CareerSuggestionOutput;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

export async function handleCareerFormSubmit(formData: CareerFormValues): Promise<ActionResult> {
  const validationResult = CareerFormSchema.safeParse(formData);

  if (!validationResult.success) {
    return { 
      success: false, 
      error: "Invalid form data.",
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  const aiInput: CareerSuggestionInput = {
    name: validationResult.data.name,
    interests: validationResult.data.interests,
    favoriteSubjects: validationResult.data.favoriteSubjects,
    grades: validationResult.data.grades,
    skills: validationResult.data.skills,
    educationLevel: validationResult.data.educationLevel,
  };

  try {
    const suggestions = await generateCareerSuggestions(aiInput);
    if (suggestions && suggestions.suggestions && suggestions.suggestions.length > 0) {
      return { success: true, data: suggestions };
    } else {
      return { success: false, error: "The AI could not generate suggestions based on your input. Please try again with different details." };
    }
  } catch (error) {
    console.error("Error generating career suggestions:", error);
    // Check if the error is an object and has a message property
    const errorMessage = (typeof error === 'object' && error !== null && 'message' in error) 
                         ? String((error as { message: string }).message) 
                         : "An unexpected error occurred while generating suggestions.";
    return { success: false, error: errorMessage };
  }
}
