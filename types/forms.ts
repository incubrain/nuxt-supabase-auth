import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must contain 8 characters")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[^a-zA-Z0-9]/, "Password must contain a special character");

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

const formFieldSchema = z.object({
  name: z.string(),
  width: z.literal("full" || "half"),
  props: z.object({
    label: z.string(),
    type: z.string(),
    disabled: z.boolean().optional(),
  }),
});

export const RegisterForm = toTypedSchema(RegisterSchema);
export const LoginForm = toTypedSchema(LoginSchema);
export const ForgotPasswordForm = toTypedSchema(ForgotPasswordSchema);
export const ResetPasswordForm = toTypedSchema(ResetPasswordSchema);

export type Login = z.infer<typeof LoginSchema>;
export type Register = z.infer<typeof RegisterSchema>;
export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
export type FormField = z.infer<typeof formFieldSchema>;
