import { Input as InputNEXT, InputProps } from "@heroui/react";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputProps & {isTransparent?: boolean}>(({ isTransparent = true, ...props }, ref) => {
  return (
    <InputNEXT
      ref={ref}
      labelPlacement={"outside"}
      placeholder={" "}
      size="md"
      variant={"bordered"}
      {...props}
      classNames={{
        ...props.classNames,
        label: cn("text-sm", props.classNames?.label ?? ""),
        input: cn("text-sm", props.classNames?.input ?? ""),
        inputWrapper: cn(
          "bg-zinc-900 data-[hover=true]:bg-zinc-700 group-data-[focus=true]:bg-zinc-800 border-none",
          isTransparent ? `!bg-opacity-20 bg-zinc-600 data-[hover=true]:bg-zinc-400 group-data-[focus=true]:bg-zinc-500 ${props.isInvalid ? "border-solid" : ""}` : "",
          props.classNames?.inputWrapper ?? "",
        ),
      }}
    />
  );
});

Input.displayName = "Input";
export { Input };
