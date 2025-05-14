"use server";

import { generateCareerSuggestions, type CareerSuggestionInput, type CareerSuggestionOutput } from '@/ai/flows/generate-career-suggestions';
import { CareerFormSchema, type CareerFormValues, ContactFormSchema, type ContactFormValues } from '@/types';

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
    const errorMessage = (typeof error === 'object' && error !== null && 'message' in error) 
                         ? String((error as { message: string }).message) 
                         : "An unexpected error occurred while generating suggestions.";
    return { success: false, error: errorMessage };
  }
}

interface ContactActionResult {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

export async function handleContactFormSubmit(formData: ContactFormValues): Promise<ContactActionResult> {
  const validationResult = ContactFormSchema.safeParse(formData);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Invalid form data. Please check your entries.",
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  // In a real application, you would typically send an email or save to a database here.
  // For example, using a service like Resend, SendGrid, or Nodemailer for emails,
  // or interacting with a backend API to forward a message (e.g., to WhatsApp via an API).
  // Since direct WhatsApp/SMS sending from server actions without a third-party API is complex and
  // potentially insecure for client-side phone numbers, we'll simulate success for this prototype.
  
  console.log("Contact form submitted:", validationResult.data);
  // You could log this data or send an email to 'rahangdalepradeep714@gmail.com'
  // with the content:
  // Name: ${validationResult.data.name}
  // Email: ${validationResult.data.email}
  // Message: ${validationResult.data.message}

  return {
    success: true,
    message: "Your message has been sent successfully! We will get back to you soon.",
  };
}
