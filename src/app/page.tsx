import { CarCarousel } from './components/CarCarousel';
import { CarDetails } from './components/CarDetails';
import { Header } from './components/Header';
import { carData } from '@/lib/car-data';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <Header />
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <CarCarousel />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-8">
            <CarDetails car={carData} />
          </div>
        </div>
      </div>
    </main>
  );
}
