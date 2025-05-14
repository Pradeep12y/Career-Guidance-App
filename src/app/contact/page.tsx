"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, User, Mail, MessageSquare, Send, Phone, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ContactFormSchema, type ContactFormValues } from "@/types";
import { handleContactFormSubmit } from "@/app/actions";
import React, { useState } from "react";

export default function ContactPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsLoading(true);
    const result = await handleContactFormSubmit(values);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.message || "Could not send your message. Please try again.",
      });
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([fieldName, errors]) => {
          if (errors && errors.length > 0) {
            form.setError(fieldName as keyof ContactFormValues, {
              type: 'server',
              message: errors.join(', '),
            });
          }
        });
      }
    }
  }

  return (
    <div className="py-8 md:py-12">
      <Card className="w-full max-w-3xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">Contact Us</CardTitle>
          <CardDescription className="text-md">
            We'd love to hear from you! Reach out with any questions or feedback.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center">
                <Info className="mr-2 h-6 w-6 text-accent" />
                Contact Information
              </h3>
              <p className="text-muted-foreground flex items-center mb-1">
                <Mail className="mr-2 h-5 w-5 text-primary" />
                <a href="mailto:rahangdalepradeep714@gmail.com" className="hover:underline">
                  rahangdalepradeep714@gmail.com
                </a>
              </p>
              <p className="text-muted-foreground flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary" />
                <a href="tel:+9131302329" className="hover:underline">
                  +91 9131302329
                </a>
              </p>
            </div>
            <div>
               <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center">
                <MessageSquare className="mr-2 h-6 w-6 text-accent" />
                Send us a Message
              </h3>
              <p className="text-muted-foreground">
                Alternatively, fill out the form and we'll get back to you as soon as possible.
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><User className="mr-2 h-5 w-5 text-primary" />Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><Mail className="mr-2 h-5 w-5 text-primary" />Your Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="E.g., john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><MessageSquare className="mr-2 h-5 w-5 text-primary" />Your Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Let us know how we can help..." {...field} rows={5}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
