"use client";

import React from 'react';

interface WhatsAppFABProps {
  phoneNumber: string;
  message?: string;
}

// Basic SVG WhatsApp Icon
const WhatsAppIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.35 3.43 16.84L2.05 22L7.31 20.62C8.75 21.39 10.36 21.81 12.04 21.81C17.5 21.81 21.95 17.36 21.95 11.91C21.95 6.45 17.5 2 12.04 2ZM12.04 20.13C10.56 20.13 9.12 19.76 7.86 19.08L7.5 18.88L4.32 19.73L5.19 16.64L4.97 16.27C4.22 14.93 3.81 13.44 3.81 11.91C3.81 7.39 7.52 3.68 12.04 3.68C16.56 3.68 20.27 7.39 20.27 11.91C20.27 16.43 16.56 20.13 12.04 20.13ZM16.57 14.47C16.31 14.34 15.13 13.78 14.89 13.69C14.65 13.6 14.49 13.55 14.32 13.8C14.15 14.06 13.66 14.62 13.49 14.79C13.32 14.96 13.16 14.98 12.92 14.89C12.68 14.81 11.86 14.53 10.89 13.68C10.13 13.01 9.61 12.2 9.47 11.95C9.33 11.71 9.44 11.58 9.56 11.46C9.67 11.35 9.81 11.18 9.93 11.04C10.04 10.91 10.09 10.8 10.17 10.63C10.26 10.46 10.21 10.31 10.14 10.18C10.07 10.05 9.61 8.87 9.42 8.41C9.23 7.95 9.04 8.01 8.91 8.01C8.77 8.01 8.61 8.01 8.44 8.01C8.28 8.01 8.04 8.06 7.83 8.32C7.62 8.57 7.06 9.11 7.06 10.18C7.06 11.26 7.86 12.26 7.98 12.43C8.1 12.6 9.61 14.93 11.93 15.9C12.43 16.1 12.81 16.23 13.11 16.33C13.58 16.48 14.01 16.46 14.34 16.39C14.72 16.31 15.75 15.72 15.96 15.2C16.17 14.68 16.17 14.24 16.11 14.11C16.04 13.98 15.88 13.92 15.67 13.82C15.46 13.72 16.82 14.59 16.57 14.47Z"
    />
  </svg>
);


export const WhatsAppFAB: React.FC<WhatsAppFABProps> = ({ phoneNumber, message }) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center justify-center no-print"
      aria-label="Chat on WhatsApp"
      data-tooltip-id="whatsapp-tooltip"
      data-tooltip-content="Chat with us on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
};
