import { Input as InputNEXT, InputProps } from "@nextui-org/react";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return (
    <InputNEXT
      ref={ref}
      labelPlacement={"outside"}
      size="md"
      variant={"bordered"}
      {...props}
      classNames={{
        label: cn("text-sm", props.classNames?.label ?? ""),
        input: cn("text-sm", props.classNames?.input ?? ""),
        inputWrapper: cn(
          "rounded-lg border-neutral-800 border-1",
          props.classNames?.inputWrapper ?? "",
        ),
      }}
    />
  );
});

Input.displayName = "Input";
export { Input };
