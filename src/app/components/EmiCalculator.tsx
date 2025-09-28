'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BarChart } from 'lucide-react';

interface EmiCalculatorProps {
  carPrice: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const INTEREST_RATE = 8.5; // Annual interest rate in percent

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function EmiCalculator({ carPrice, open, onOpenChange }: EmiCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(carPrice * 0.8);
  const [downPayment, setDownPayment] = useState(carPrice * 0.2);
  const [loanDuration, setLoanDuration] = useState(66);
  const [emi, setEmi] = useState(0);

  const maxDownPayment = carPrice - 100000;

  useEffect(() => {
    setLoanAmount(carPrice - downPayment);
  }, [downPayment, carPrice]);

  useEffect(() => {
    const principal = loanAmount;
    if (principal <= 0) {
      setEmi(0);
      return;
    }
    const monthlyInterestRate = INTEREST_RATE / (12 * 100);
    const numberOfPayments = loanDuration;

    if (monthlyInterestRate > 0) {
        const emiValue =
        (principal *
            monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        setEmi(emiValue);
    } else {
        setEmi(principal / numberOfPayments);
    }
  }, [loanAmount, loanDuration]);

  const handleDownPaymentChange = (value: number[]) => {
    setDownPayment(value[0]);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Check Eligibility</DialogTitle>
          <DialogDescription>EMI Calculator</DialogDescription>
        </DialogHeader>
        <div className="space-y-8 py-4">
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="loan-amount">Loan Amount</Label>
              <span className="font-semibold">{formatCurrency(loanAmount)}</span>
            </div>
            <Slider
                id="loan-amount"
                min={100000}
                max={carPrice}
                step={1000}
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
                aria-label="Loan Amount"
              />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatCurrency(100000)}</span>
                <span>{formatCurrency(carPrice)}</span>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="down-payment">Down Payment*</Label>
              <span className="font-semibold">{formatCurrency(downPayment)}</span>
            </div>
            <Slider
                id="down-payment"
                min={0}
                max={maxDownPayment > 0 ? maxDownPayment: 0}
                step={1000}
                value={[downPayment]}
                onValueChange={handleDownPaymentChange}
                aria-label="Down Payment"
              />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatCurrency(0)}</span>
                <span>{formatCurrency(maxDownPayment)}</span>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="loan-duration">Duration of Loan</Label>
              <span className="font-semibold">{loanDuration} Months</span>
            </div>
             <Slider
                id="loan-duration"
                min={12}
                max={84}
                step={1}
                value={[loanDuration]}
                onValueChange={(value) => setLoanDuration(value[0])}
                aria-label="Duration of Loan"
              />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>12 Months</span>
                <span>84 Months</span>
            </div>
          </div>

          <div className='flex flex-col items-center gap-2'>
            <p className='text-3xl font-bold text-primary'>{formatCurrency(emi)} <span className='text-xl text-muted-foreground font-medium'>per month</span></p>
            <Button variant='link' className='text-primary'>
                <BarChart className='mr-2 h-4 w-4' />
                View Loan Breakup
            </Button>
          </div>
          
          <Button type="submit" className="w-full" size='lg'>
            Check eligibility
          </Button>

          <div className='text-xs text-muted-foreground space-y-2'>
            <p>*Rate of interest can vary subject to credit profile. Loan approval is at the sole discretion of the finance partner.</p>
            <p>**Processing fee and other loan charges are not included.</p>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
