"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ThreeDViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TOTAL_FRAMES = PlaceHolderImages.length; // Use the number of available images

export function ThreeDViewer({ open, onOpenChange }: ThreeDViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const isDragging = useRef(false);
  const previousPosition = useRef(0);

  const getFrameUrl = (frame: number) => {
    // Cycle through the available placeholder images
    return PlaceHolderImages[frame].imageUrl;
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    previousPosition.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const delta = e.clientX - previousPosition.current;
    
    // Move to next/prev frame every 15 pixels moved
    if (Math.abs(delta) > 15) {
      if (delta > 0) {
        // move right
        setCurrentFrame((prev) => (prev + 1) % TOTAL_FRAMES);
      } else {
        // move left
        setCurrentFrame((prev) => (prev - 1 + TOTAL_FRAMES) % TOTAL_FRAMES);
      }
      previousPosition.current = e.clientX;
    }
  };
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = true;
    previousPosition.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientX - previousPosition.current;

    if (Math.abs(delta) > 15) {
      if (delta > 0) {
        setCurrentFrame((prev) => (prev + 1) % TOTAL_FRAMES);
      } else {
        setCurrentFrame((prev) => (prev - 1 + TOTAL_FRAMES) % TOTAL_FRAMES);
      }
      previousPosition.current = e.touches[0].clientX;
    }
  };


  useEffect(() => {
    // Preload images for a smoother experience
    PlaceHolderImages.forEach((img) => {
      const image = new window.Image();
      image.src = img.imageUrl;
    });
  }, []);

  useEffect(() => {
    const handleMouseUpOutside = () => {
      if (isDragging.current) {
        isDragging.current = false;
      }
    };
    window.addEventListener('mouseup', handleMouseUpOutside);
    window.addEventListener('touchend', handleMouseUpOutside);
    return () => {
      window.removeEventListener('mouseup', handleMouseUpOutside);
      window.removeEventListener('touchend', handleMouseUpOutside);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[60vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0 sr-only">
          <DialogTitle>360° Interactive View</DialogTitle>
          <DialogDescription>
            Click and drag to rotate the car.
          </DialogDescription>
        </DialogHeader>
        <div 
          className="w-full h-full flex-1 rounded-b-lg overflow-hidden relative cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves the container
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          <Image
            src={getFrameUrl(currentFrame)}
            alt={`Car view frame ${currentFrame + 1}`}
            fill
            className="object-contain select-none"
            draggable="false"
            unoptimized // Perf-optimization for rapid image switching
            priority
          />
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            Drag to rotate
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
