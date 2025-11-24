import { z } from "zod";

export const userRegisterSchema = z.object({
  firstName: z.string().min(3, { error: "First Name is required" }),
  lastName: z.string().min(3, { error: "Last Name is required" }),
  email: z.email({ error: "Invalid Email Address" }),
  password: z
    .string({ error: "Password is required" })
    .min(4, { message: "Password must be atleast 4 characters" }),
});

export type userRegisterSchemaType = z.infer<typeof userRegisterSchema>;
