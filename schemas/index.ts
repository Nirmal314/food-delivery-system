import * as z from "zod";

const phoneRegex = /^(?:6|7|8|9)\d{9}(?:x\d+)?$/;

const emailError = "Enter a valid email.";
const pass1Error = "Password must be at least 8 characters long";
const pass2Error = "Password must contain at least one lowercase letter.";
const pass3Error = "Password must contain at least one uppercase letter.";
const pass4Error = "Password must contain at least one number.";
const phoneError = "Enter a valid phone number.";

export const LoginSchema = z.object({
  email: z.string().email(emailError),
  password: z
    .string()
    .min(8, pass1Error)
    .regex(/[a-z]/, pass2Error)
    .regex(/[A-Z]/, pass3Error)
    .regex(/[0-9]/, pass4Error),
});

export const SignupSchema = z
  .object({
    email: z.string().email(emailError),
    name: z.string().min(2),
    password: z
      .string()
      .min(8, pass1Error)
      .regex(/[a-z]/, pass2Error)
      .regex(/[A-Z]/, pass3Error)
      .regex(/[0-9]/, pass4Error),
    passwordConfirm: z
      .string()
      .min(8, "Password confirmation must be at least 8 characters long"),
    contactNumber: z.string().regex(phoneRegex, phoneError),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  );
export const AdminSignupSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(emailError),
    password: z
      .string()
      .min(8, pass1Error)
      .regex(/[a-z]/, pass2Error)
      .regex(/[A-Z]/, pass3Error)
      .regex(/[0-9]/, pass4Error),
    passwordConfirm: z
      .string()
      .min(8, "Password confirmation must be at least 8 characters long"),
    contactNumber: z.string().regex(phoneRegex, phoneError),
    restaurantName: z.string().min(2),
    restaurantPhone: z.string().regex(phoneRegex, phoneError),
    cuisine: z.string().min(1, "Required field."),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters long.")
      .max(50, "Address must not exceed 50 characters."),
    description: z
      .string()
      .max(30, "Description must not exceed 30 characters."),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  );
