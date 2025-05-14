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

  const { name, email, message } = validationResult.data;

  // TODO: Implement actual email sending here.
  // To send emails, you'll need to use an email service provider like Resend, SendGrid, or Nodemailer.
  // 1. Choose a service and sign up.
  // 2. Install their SDK (e.g., `npm install resend` or `yarn add resend`).
  // 3. Configure API keys in your environment variables (e.g., create a .env.local file).
  // 4. Import the SDK and use it to send the email below.

  /*
  // CONCEPTUAL EXAMPLE using Resend:
  // Make sure to install the 'resend' package: `npm install resend`
  // And set RESEND_API_KEY in your .env.local file.

  // import { Resend } from 'resend';
  // const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Ai Career Guide <onboarding@resend.dev>', // Replace with your "from" email (Resend might require a verified domain)
      to: ['rahangdalepradeep714@gmail.com'],      // Your email address to receive notifications
      reply_to: email,                             // Set sender's email as reply-to
      subject: `New Contact Form Submission from ${name} - Ai Career Guide`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Error sending contact email via Resend:", error);
      return {
        success: false,
        message: "Your message was submitted, but there was an error sending the email notification. Please try again later.",
      };
    }

    console.log("Contact form submitted and email sent via Resend:", validationResult.data, data);
    return {
      success: true,
      message: "Your message has been sent successfully! We will get back to you soon.",
    };

  } catch (exception) {
    console.error("Exception sending contact email:", exception);
    return {
      success: false,
      message: "Your message was submitted, but an unexpected error occurred while sending the email notification.",
    };
  }
  */

  // Current behavior: Log to console and simulate success.
  // Remove or replace this section once actual email sending is implemented.
  console.log("Contact form submitted (actual email sending not implemented):", validationResult.data);
  console.log(`Simulating email to rahangdalepradeep714@gmail.com:`);
  console.log(`Subject: New Contact Form Submission from ${name}`);
  console.log(`Name: ${name}, Email: ${email}`);
  console.log(`Message: ${message}`);

  return {
    success: true,
    // Update the message to reflect that the email is simulated for now.
    message: "Your message has been submitted successfully! (Admin email notification is currently simulated). We will get back to you soon.",
  };
}
