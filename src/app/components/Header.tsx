import { Car } from 'lucide-react';

export function Header() {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-4">
        <Car className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">
          AutoSpin 360
        </h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        Your interactive guide to the new Porsche 911 Carrera.
      </p>
    </header>
  );
}
