import type { CarData } from '@/lib/car-data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CalendarDays,
  Car,
  CircleDollarSign,
  Gauge,
} from 'lucide-react';

interface CarDetailsProps {
  car: CarData;
}

export function CarDetails({ car }: CarDetailsProps) {
  const details = [
    {
      icon: <Car />,
      label: 'Model',
      value: car.model,
    },
    {
      icon: <CalendarDays />,
      label: 'Year',
      value: car.year,
    },
    {
      icon: <Gauge />,
      label: 'Mileage',
      value: `${car.mileage.toLocaleString()} mi`,
    },
    {
      icon: <CircleDollarSign />,
      label: 'Price',
      value: `$${car.price.toLocaleString()}`,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Car Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {details.map((detail) => (
            <div key={detail.label} className="flex items-start gap-4">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                {detail.icon}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{detail.label}</p>
                <p className="font-semibold text-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
