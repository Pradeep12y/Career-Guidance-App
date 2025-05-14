
"use client";

import { Mail, Phone, Linkedin, Github, Instagram, MessageSquare, Info } from "lucide-react";
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

// Re-using the WhatsAppIcon from the FAB component for consistency
const WhatsAppIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
  >
    <path
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.35 3.43 16.84L2.05 22L7.31 20.62C8.75 21.39 10.36 21.81 12.04 21.81C17.5 21.81 21.95 17.36 21.95 11.91C21.95 6.45 17.5 2 12.04 2ZM12.04 20.13C10.56 20.13 9.12 19.76 7.86 19.08L7.5 18.88L4.32 19.73L5.19 16.64L4.97 16.27C4.22 14.93 3.81 13.44 3.81 11.91C3.81 7.39 7.52 3.68 12.04 3.68C16.56 3.68 20.27 7.39 20.27 11.91C20.27 16.43 16.56 20.13 12.04 20.13ZM16.57 14.47C16.31 14.34 15.13 13.78 14.89 13.69C14.65 13.6 14.49 13.55 14.32 13.8C14.15 14.06 13.66 14.62 13.49 14.79C13.32 14.96 13.16 14.98 12.92 14.89C12.68 14.81 11.86 14.53 10.89 13.68C10.13 13.01 9.61 12.2 9.47 11.95C9.33 11.71 9.44 11.58 9.56 11.46C9.67 11.35 9.81 11.18 9.93 11.04C10.04 10.91 10.09 10.8 10.17 10.63C10.26 10.46 10.21 10.31 10.14 10.18C10.07 10.05 9.61 8.87 9.42 8.41C9.23 7.95 9.04 8.01 8.91 8.01C8.77 8.01 8.61 8.01 8.44 8.01C8.28 8.01 8.04 8.06 7.83 8.32C7.62 8.57 7.06 9.11 7.06 10.18C7.06 11.26 7.86 12.26 7.98 12.43C8.1 12.6 9.61 14.93 11.93 15.9C12.43 16.1 12.81 16.23 13.11 16.33C13.58 16.48 14.01 16.46 14.34 16.39C14.72 16.31 15.75 15.72 15.96 15.2C16.17 14.68 16.17 14.24 16.11 14.11C16.04 13.98 15.88 13.92 15.67 13.82C15.46 13.72 16.82 14.59 16.57 14.47Z"
    />
  </svg>
);


export default function ContactPage() {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-6 w-6" />,
      href: "https://www.linkedin.com/in/pradeeprahangdale/", // Replace with your actual LinkedIn profile URL
      handle: "@pradeeprahangdale"
    },
    {
      name: "GitHub",
      icon: <Github className="h-6 w-6" />,
      href: "https://github.com/Pradeeprahangdale", // Replace with your actual GitHub profile URL
      handle: "@Pradeeprahangdale"
    },
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon />,
      href: "https://wa.me/9131302329", // Your WhatsApp number
      handle: "+91 9131302329"
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-6 w-6" />,
      href: "https://www.instagram.com/pradeep_rahangdale_/", // Replace with your actual Instagram profile URL
      handle: "@pradeep_rahangdale_"
    },
  ];

  return (
    <div className="py-8 md:py-12">
      <Card className="w-full max-w-xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">Contact Us</CardTitle>
          <CardDescription className="text-md">
            Get in touch with us through email, phone, or our social channels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
              <Info className="mr-2 h-6 w-6 text-accent" />
              Direct Contact
            </h3>
            <div className="flex items-center text-muted-foreground hover:text-primary transition-colors">
              <Mail className="mr-3 h-5 w-5 text-primary" />
              <a href="mailto:rahangdalepradeep714@gmail.com" className="hover:underline">
                rahangdalepradeep714@gmail.com
              </a>
            </div>
            <div className="flex items-center text-muted-foreground hover:text-primary transition-colors">
              <Phone className="mr-3 h-5 w-5 text-primary" />
              <a href="tel:+9131302329" className="hover:underline">
                +91 9131302329
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
              <MessageSquare className="mr-2 h-6 w-6 text-accent" />
              Connect With Us
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors group"
                >
                  <span className="text-primary group-hover:text-accent transition-colors">{link.icon}</span>
                  <div className="ml-3">
                    <p className="font-medium text-foreground group-hover:text-accent transition-colors">{link.name}</p>
                    <p className="text-sm text-muted-foreground">{link.handle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
