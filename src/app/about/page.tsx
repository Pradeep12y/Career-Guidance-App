import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Code, GraduationCap, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-8 md:py-12">
      <Card className="w-full max-w-3xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">About Ai Career Guide</CardTitle>
          <CardDescription className="text-md">
            Navigating Your Future with Intelligent Insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center">
              <GraduationCap className="mr-2 h-6 w-6 text-accent" />
              Project Overview
            </h2>
            <p>
              Ai Career Guide is an innovative platform designed to assist students and professionals 
              in making informed decisions about their career paths. Leveraging the power of artificial 
              intelligence, our application provides personalized career suggestions based on individual 
              interests, academic performance, skills, and educational background.
            </p>
            <p className="mt-2">
              This project was developed as a group submission for our college curriculum, aiming to 
              solve a real-world problem by applying modern web development and AI technologies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center">
              <Users className="mr-2 h-6 w-6 text-accent" />
              Our Team
            </h2>
            <p>
              This project is a collaborative effort by a dedicated group of students:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
              <li>Pradeep Rahangdale (Developer)</li>
              <li>Purvesh Daharwal</li>
              <li>Milesh Kumar</li>
              <li>Durgesh Khune</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center">
              <Code className="mr-2 h-6 w-6 text-accent" />
              Technology Stack
            </h2>
            <p>
              Ai Career Guide is built using modern technologies including:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
              <li>Next.js (React Framework)</li>
              <li>TypeScript</li>
              <li>Tailwind CSS & ShadCN UI (Styling and Components)</li>
              <li>Genkit (AI Integration)</li>
              <li>Vercel (Deployment)</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
