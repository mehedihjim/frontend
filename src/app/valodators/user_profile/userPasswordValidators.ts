import { z } from "zod";

export const userPasswordValidationSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    password: z.string().min(1, "Password is required"),
    c_password: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.c_password, {
    message: "Passwords don't match",
    path: ["confirm_password"], // this tells Zod where to display the error
  });


export default userPasswordValidationSchema;
