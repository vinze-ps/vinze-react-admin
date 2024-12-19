import { z } from "zod";

export const loginSchema  = z.object({
  username: z.string().min(2).max(50),
  password: z
    .string()
    .min(6)
    .max(50)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;