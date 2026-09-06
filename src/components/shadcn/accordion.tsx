"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

export function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    data-slot="accordion-item"
    className={cn("border-b border-slate-200", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(
        "group/trigger flex flex-1 cursor-pointer items-start justify-between gap-5 py-5 text-right outline-none transition-colors hover:text-brand-700 focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-brand-400 sm:py-6",
        className,
      )}
      {...props}
    >
      {children}
      <span className="relative mt-1 grid size-8 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-500 transition group-data-[state=open]/trigger:border-brand-200 group-data-[state=open]/trigger:bg-brand-50 group-data-[state=open]/trigger:text-brand-600">
        <span className="h-px w-3 bg-current" />
        <span className="absolute h-3 w-px bg-current transition-all group-data-[state=open]/trigger:rotate-90 group-data-[state=open]/trigger:opacity-0" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    data-slot="accordion-content"
    className="overflow-hidden data-[state=closed]:animate-[accordion-up_.2s_ease-out] data-[state=open]:animate-[accordion-down_.25s_ease-out]"
    {...props}
  >
    <div className={cn("pb-6", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
