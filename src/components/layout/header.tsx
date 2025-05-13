import { Compass } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md no-print">
      <div className="container mx-auto flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Compass size={32} />
          <h1 className="text-2xl font-bold">Career Compass</h1>
        </Link>
      </div>
    </header>
  );
}
