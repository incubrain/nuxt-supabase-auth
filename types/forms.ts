import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const passwordSchema = z
  .string()
  .min(8, 'Password must contain 8 characters')
  .regex(/[A-Z]/, 'Password must contain an uppercase letter')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain a special character')

export const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  })

export const LoginSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const UpdatePasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  })

const formFieldSchema = z.object({
  name: z.string(),
  width: z.literal('full' || 'half'),
  props: z.object({
    label: z.string(),
    type: z.string(),
    disabled: z.boolean().optional(),
  }),
})

export const RegisterForm = toTypedSchema(RegisterSchema)
export const LoginForm = toTypedSchema(LoginSchema)
export const ForgotPasswordForm = toTypedSchema(ForgotPasswordSchema)
export const UpdatePasswordForm = toTypedSchema(UpdatePasswordSchema)

export type Login = z.infer<typeof LoginSchema>
export type Register = z.infer<typeof RegisterSchema>
export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>
export type UpdatePassword = z.infer<typeof UpdatePasswordSchema>
export type FormField = z.infer<typeof formFieldSchema>
