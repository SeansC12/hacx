import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base FormSG styles
        "w-full min-w-0 rounded-md border bg-white px-3 py-2.5 text-sm transition-all duration-200 outline-none",
        // FormSG border and text styling
        "border-gray-300 text-gray-900 placeholder:text-gray-500",
        // FormSG focus states - clean blue outline
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
        // Subtle hover effect
        "hover:border-gray-400",
        // Error states
        "aria-invalid:border-red-500 aria-invalid:focus:ring-red-500/20",
        // Disabled states
        "disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed",
        // File input styling to match FormSG
        "file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-600 file:text-white file:text-xs file:font-medium file:cursor-pointer hover:file:bg-blue-700",
        // Clean selection
        "selection:bg-blue-100 selection:text-blue-900",
        // Remove default styling for specific input types
        "[&[type='time']]:appearance-none [&[type='date']]:appearance-none",
        "[&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

function Input_Shadcn({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input_Shadcn as Input };
