# 
ALPHA - Interactive Car Showcase

Welcome to AutoSpin 360! This is a Next.js application designed to provide an interactive and engaging showcase for automobiles. It's built with modern web technologies to deliver a rich user experience.

## Features

This application includes several key features that make exploring a car's details intuitive and visually appealing.

### 1. Image Carousel

The main image viewer is a fully responsive carousel that allows users to browse through high-quality images of the car.

- **Smooth Navigation:** Users can click the "Previous" and "Next" arrows to cycle through the images.
- **Touch-Friendly:** On mobile devices, users can swipe left and right to navigate.
- **Engaging Visuals:** It showcases multiple angles of the car, including front, side, rear, and interior views.

This component is located at `src/app/components/CarCarousel.tsx`.

### 2. 360° Interactive View

For a more immersive experience, users can click the "360° Interactive View" button.

- **Modal Experience:** This opens a dialog window (modal) that displays the car.
- **Drag to Rotate:** Inside the modal, users can click and drag their mouse (or use touch and drag on mobile) to rotate the car and see it from every angle.
- **How it Works:** This feature is powered by a sequence of images. The component tracks the user's drag movement and swaps the displayed image to create a smooth, 360-degree rotation effect.

The logic for this feature can be found in `src/app/components/ThreeDViewer.tsx`.

### 3. EMI Calculator

To assist with financial planning, a "Calculate EMI" button is available.

- **Interactive Form:** Clicking the button opens a dialog with a user-friendly form to calculate the Equated Monthly Instalment (EMI) for a car loan.
- **Adjustable Parameters:** Users can adjust the following values using sliders:
  - Loan Amount
  - Down Payment
  - Duration of Loan (in months)
- **Instant Calculation:** The estimated monthly payment is calculated and displayed in real-time as the user adjusts the parameters.

This functionality is implemented in `src/app/components/EmiCalculator.tsx`.

### 4. Car Overview Section

A dedicated section provides a quick glance at the car's essential details.

- **At-a-Glance Information:** This card displays key specifications, including:
  - **Model:** The car's model name.
  - **Year:** The manufacturing year.
  - **Mileage:** The distance the car has traveled.
  - **Price:** The current price of the car.
- **Clear & Concise:** Each detail is presented with a corresponding icon for easy readability.

This information is displayed using the `src/app/components/CarDetails.tsx` component, which sources its data from `src/lib/car-data.ts`.

## Tech Stack

- **Framework:** Next.js (with React)
- **Styling:** Tailwind CSS with shadcn/ui components
- **Language:** TypeScript
- **Interactivity:** React Hooks for state management

This project is set up to be easily extendable. You can modify the car data, add more images, or integrate new features as needed.
