import { Button as ButtonNEXT, ButtonProps } from "@nextui-org/react";

import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import {RoundSpinner} from "@/components/ui/spinner.tsx";

const Button = forwardRef<HTMLButtonElement, ButtonProps & {isTransparent?: boolean}>(({ className, isLoading, isTransparent, ...props }, ref) => {
  return (
    <ButtonNEXT
      ref={ref}
      labelPlacement={"outside"}
      size="md"
      variant={"flat"}
      {...props}
      startContent={isLoading ? <RoundSpinner size={"xs"}/> : props.startContent}
      className={cn("text-sm", isTransparent ? "!bg-opacity-20 bg-zinc-600 data-[hover=true]:bg-zinc-400 group-data-[focus=true]:bg-zinc-500" : "", className ?? "")}
    />
  );
});

Button.displayName = "Button";
export { Button };
