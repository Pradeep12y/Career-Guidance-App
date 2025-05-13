'use server';

/**
 * @fileOverview A career suggestion AI agent.
 *
 * - generateCareerSuggestions - A function that handles the career suggestion generation process.
 * - CareerSuggestionInput - The input type for the generateCareerSuggestions function.
 * - CareerSuggestionOutput - The return type for the generateCareerSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerSuggestionInputSchema = z.object({
  name: z.string().describe('The name of the student.'),
  interests: z.string().describe('The interests of the student.'),
  favoriteSubjects: z.string().describe('The favorite subjects of the student.'),
  grades: z.string().describe('The grades of the student.'),
  skills: z.string().describe('The skills of the student.'),
  educationLevel: z.string().describe('The education level of the student.'),
});
export type CareerSuggestionInput = z.infer<typeof CareerSuggestionInputSchema>;

const CareerSuggestionOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      career: z.string().describe('The name of the career.'),
      description: z.string().describe('A brief description of the career.'),
      qualifications: z.string().describe('The required qualifications for the career.'),
      salaryRange: z.string().describe('The potential salary range for the career.'),
    })
  ).describe('A list of career suggestions.'),
});
export type CareerSuggestionOutput = z.infer<typeof CareerSuggestionOutputSchema>;

export async function generateCareerSuggestions(input: CareerSuggestionInput): Promise<CareerSuggestionOutput> {
  return generateCareerSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCareerSuggestionsPrompt',
  input: {schema: CareerSuggestionInputSchema},
  output: {schema: CareerSuggestionOutputSchema},
  prompt: `You are a career counselor expert specializing in suggesting career paths to students.

You will use the following information about the student to generate 3-5 personalized career suggestions.

Name: {{{name}}}
Interests: {{{interests}}}
Favorite Subjects: {{{favoriteSubjects}}}
Grades: {{{grades}}}
Skills: {{{skills}}}
Education Level: {{{educationLevel}}}

Each career suggestion should include a brief description, required qualifications, and potential salary range.
`,
});

const generateCareerSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateCareerSuggestionsFlow',
    inputSchema: CareerSuggestionInputSchema,
    outputSchema: CareerSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
