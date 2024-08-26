import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Title = forwardRef<HTMLDivElement, { title: string; className?: string }>(
  ({ title, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("text-2xl font-bold", className)} {...props}>
        {title}
      </div>
    );
  }
);

Title.displayName = "Title";
export { Title };
