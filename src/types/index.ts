import { z } from 'zod';

export const EducationLevels = [
  "High School Diploma or GED",
  "Some College, No Degree",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctoral Degree (Ph.D.)",
  "Professional Degree (MD, JD, etc.)"
] as const;

export type EducationLevel = typeof EducationLevels[number];

export const CareerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
  interests: z.string().min(10, { message: "Please describe your interests (min 10 characters)." }).max(1000),
  favoriteSubjects: z.string().min(5, { message: "Please list favorite subjects (min 5 characters)." }).max(500),
  grades: z.string().min(1, { message: "Please provide your grades or GPA." }).max(100),
  skills: z.string().min(10, { message: "Please list your skills (min 10 characters)." }).max(1000),
  educationLevel: z.enum(EducationLevels, {
    errorMap: () => ({ message: "Please select your education level." }),
  }),
});

export type CareerFormValues = z.infer<typeof CareerFormSchema>;
