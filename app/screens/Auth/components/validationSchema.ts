import { z } from 'zod';

const reqErrMsg = (field: string): string => {
  return `${field} is required.`;
};

// Improved schema with explicit "required" check
export const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: reqErrMsg("Email") })  // Ensure it's not empty
    .email({ message: "Invalid email address." }),  // Then ensure it's a valid email
  password: z
    .string()
    .min(1, { message: reqErrMsg("Password") })  // Ensure password is not empty
});

export type ValidationForm = z.infer<typeof FormSchema>;
