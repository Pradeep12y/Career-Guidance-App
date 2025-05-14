import { Compass, Info, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md no-print">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Compass size={32} />
          <h1 className="text-2xl font-bold">Ai Career Guide</h1>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild className="text-sm sm:text-base hover:bg-primary/80">
            <Link href="/about">
              <Info className="mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" />
              About
            </Link>
          </Button>
          <Button variant="ghost" asChild className="text-sm sm:text-base hover:bg-primary/80">
            <Link href="/contact">
              <Mail className="mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" />
              Contact Us
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
