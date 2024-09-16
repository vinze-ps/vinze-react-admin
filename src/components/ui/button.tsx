import { Button as ButtonNEXT, ButtonProps } from "@nextui-org/react";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Button = forwardRef<HTMLButtonElement, ButtonProps & {isTransparent?: boolean}>(({ isTransparent, ...props }, ref) => {
  return (
    <ButtonNEXT
      ref={ref}
      labelPlacement={"outside"}
      size="md"
      variant={"flat"}
      {...props}
      className={cn("text-sm", isTransparent ? "!bg-opacity-20 bg-zinc-600 data-[hover=true]:bg-zinc-400 group-data-[focus=true]:bg-zinc-500" : "", props.className ?? "")}
    />
  );
});

Button.displayName = "Button";
export { Button };
