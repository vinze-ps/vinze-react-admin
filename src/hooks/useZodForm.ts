import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";

export function useZodForm<T extends ZodType<any>>(
  schema: T,
  options?: UseFormProps<T['_input']>
) {
  return useForm<T['_input']>({
    resolver: zodResolver(schema),
    ...options,
  });
}
