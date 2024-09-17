import { Input as InputNEXT, InputProps } from "@nextui-org/react";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputProps & {isTransparent?: boolean}>(({ isTransparent, ...props }, ref) => {
  return (
    <InputNEXT
      ref={ref}
      labelPlacement={"outside"}
      size="md"
      variant={"bordered"}
      {...props}
      classNames={{
        ...props.classNames,
        label: cn("text-sm", props.classNames?.label ?? ""),
        input: cn("text-sm", props.classNames?.input ?? ""),
        inputWrapper: cn(
          "border-none",
          isTransparent ? `!bg-opacity-20 bg-zinc-600 data-[hover=true]:bg-zinc-400 group-data-[focus=true]:bg-zinc-500 ${props.isInvalid ? "border-solid" : ""}` : "",
          props.classNames?.inputWrapper ?? "",
        ),
      }}
    />
  );
});

Input.displayName = "Input";
export { Input };
