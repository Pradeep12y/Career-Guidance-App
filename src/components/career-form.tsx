"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2, User, Lightbulb, BookOpen, Award, Wrench, GraduationCap, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CareerFormSchema, type CareerFormValues, EducationLevels } from "@/types";
import { handleCareerFormSubmit } from "@/app/actions";
import { useResults } from "@/context/results-context";

export function CareerForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { setResults, setIsLoading, isLoading } = useResults();

  const form = useForm<CareerFormValues>({
    resolver: zodResolver(CareerFormSchema),
    defaultValues: {
      name: "",
      interests: "",
      favoriteSubjects: "",
      grades: "",
      skills: "",
      educationLevel: undefined,
    },
  });

  async function onSubmit(values: CareerFormValues) {
    setIsLoading(true);
    setResults(null); // Clear previous results

    const result = await handleCareerFormSubmit(values);

    setIsLoading(false);

    if (result.success && result.data) {
      setResults(result.data);
      toast({
        title: "Suggestions Generated!",
        description: "We've found some career paths for you.",
      });
      router.push("/results");
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.error || "Could not generate suggestions. Please try again.",
      });
      // Populate field errors if any
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([fieldName, errors]) => {
          if (errors && errors.length > 0) {
            form.setError(fieldName as keyof CareerFormValues, {
              type: 'server',
              message: errors.join(', '),
            });
          }
        });
      }
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary">Find Your Path</CardTitle>
        <CardDescription className="text-md">
          Tell us about yourself, and we'll suggest some career options.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><User className="mr-2 h-5 w-5 text-primary" />Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-primary" />Interests</FormLabel>
                  <FormControl>
                    <Textarea placeholder="E.g., Technology, creative writing, helping others" {...field} rows={3}/>
                  </FormControl>
                  <FormDescription>
                    What activities or topics do you enjoy?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="favoriteSubjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><BookOpen className="mr-2 h-5 w-5 text-primary" />Favorite Subjects</FormLabel>
                  <FormControl>
                    <Textarea placeholder="E.g., Math, History, Computer Science" {...field} rows={2}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grades"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Award className="mr-2 h-5 w-5 text-primary" />Grades / Academic Performance</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Mostly A's, 3.5 GPA, Good in technical subjects" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Wrench className="mr-2 h-5 w-5 text-primary" />Skills</FormLabel>
                  <FormControl>
                    <Textarea placeholder="E.g., Problem-solving, communication, programming (Python)" {...field} rows={3}/>
                  </FormControl>
                  <FormDescription>
                    What are you good at? Include both hard and soft skills.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><GraduationCap className="mr-2 h-5 w-5 text-primary" />Current or Highest Education Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EducationLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Suggestions...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Get Career Suggestions
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
