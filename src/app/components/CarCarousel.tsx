"use client";

import Image from 'next/image';
import { useState } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Orbit } from 'lucide-react';
import { ThreeDViewer } from './ThreeDViewer';
import { EmiCalculator } from './EmiCalculator';
import { carData } from '@/lib/car-data';

export function CarCarousel() {
  const [is3dViewerOpen, set3dViewerOpen] = useState(false);
  const [isEmiCalculatorOpen, setEmiCalculatorOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <Carousel className="w-full">
            <CarouselContent>
              {PlaceHolderImages.map((img) => (
                <CarouselItem key={img.id}>
                  <div className="relative aspect-video">
                    <Image
                      src={img.imageUrl}
                      alt={img.description}
                      fill
                      className="object-cover"
                      data-ai-hint={img.imageHint}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4" />
            <CarouselNext className="absolute right-4" />
          </Carousel>
        </CardContent>
      </Card>
      <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
        <Button onClick={() => set3dViewerOpen(true)} size="lg" variant="outline">
          <Orbit className="mr-2" />
          360° Interactive View
        </Button>
        <Button onClick={() => setEmiCalculatorOpen(true)} size="lg" variant='outline'>
          <Calculator className="mr-2" />
          Calculate EMI
        </Button>
      </div>
      <ThreeDViewer open={is3dViewerOpen} onOpenChange={set3dViewerOpen} />
      <EmiCalculator carPrice={carData.price} open={isEmiCalculatorOpen} onOpenChange={setEmiCalculatorOpen} />
    </>
  );
}
