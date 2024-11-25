import { z } from 'zod';

const reqErrMsg = (field: string): string => {
  return `${field} is required.`;
};

export const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: reqErrMsg("Email") })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(1, { message: reqErrMsg("Password") })
});

export type ValidationForm = z.infer<typeof FormSchema>;
