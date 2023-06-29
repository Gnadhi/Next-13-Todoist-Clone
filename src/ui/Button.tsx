"use client";

import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
} from "react";

import { useRouter } from "next/navigation";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { VariantProps, cva } from "class-variance-authority";

/* eslint-disable tailwindcss/migration-from-tailwind-2 */

const buttonStyles = cva(
  "flex w-full justify-center rounded-md p-3 text-sm font-semibold text-white shadow-sm focus:outline focus:outline-2 focus:outline-offset-2",
  {
    variants: {
      variant: { primary: "bg-slate-900 hover:bg-gray-700" },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type HTMLButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
  HTMLButtonProps { }

/**
 * Primary UI component for user interaction
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, ...props }, ref) => {
    return (
      <button className={buttonStyles({ variant })} {...props} ref={ref}>
        {children}
      </button>
    );
  }
);

export const BackButton = ({ className }: { className: string }) => {
  const router = useRouter();
  return (
    <button className={className} onClick={() => router.back()}>
      <ChevronLeftIcon className="h-5 w-5" />
      <span className="ml-1 font-medium">Back</span>
    </button>
  );
};

export const SubmitButton = ({
  children,
  variant,
  url,
  method,
  ...props
}: ButtonProps & { url: string; method: "POST" | "GET" }) => {
  return (
    <Button
      variant={variant}
      onClick={() => {
        fetch(url, { method });
      }}
    >
      {children}
    </Button>
  );
};

Button.displayName = "Button";
