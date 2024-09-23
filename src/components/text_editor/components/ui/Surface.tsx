import { cn } from "@/lib/utils";
import { HTMLProps, forwardRef } from "react";

export type SurfaceProps = HTMLProps<HTMLDivElement> & {
  withShadow?: boolean;
};

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ children, className, withShadow = true, ...props }, ref) => {
    const surfaceClass = cn(
      className,
      "rounded-2xl bg-zinc-950",
      withShadow ? "shadow-xl" : "",
    );

    return (
      <div className={surfaceClass} {...props} ref={ref}>
        {children}
      </div>
    );
  },
);

Surface.displayName = "Surface";
