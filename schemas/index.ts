import * as z from "zod";

const phoneRegex = /^(?:6|7|8|9)\d{9}(?:x\d+)?$/;
const nameRegex = /^[a-zA-Z\s']+$/;

const emailError = "Enter a valid email.";
const pass1Error = "Password must be at least 8 characters long";
const pass2Error = "Password must contain at least one lowercase letter.";
const pass3Error = "Password must contain at least one uppercase letter.";
const pass4Error = "Password must contain at least one number.";
const phoneError = "Enter a valid phone number.";
const nameError = "Please enter a valid name.";
const cPassError = "Password confirmation must be at least 8 characters long.";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 2.5 * 1000000; //2.5 MB

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
    name: z.string().min(2).regex(nameRegex, nameError),
    password: z
      .string()
      .min(8, pass1Error)
      .regex(/[a-z]/, pass2Error)
      .regex(/[A-Z]/, pass3Error)
      .regex(/[0-9]/, pass4Error),
    passwordConfirm: z.string().min(8, cPassError),
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
    name: z.string().min(2).regex(nameRegex, nameError),
    email: z.string().email(emailError),
    password: z
      .string()
      .min(8, pass1Error)
      .regex(/[a-z]/, pass2Error)
      .regex(/[A-Z]/, pass3Error)
      .regex(/[0-9]/, pass4Error),
    passwordConfirm: z.string().min(8, cPassError),
    contactNumber: z.string().regex(phoneRegex, phoneError),
    restaurantName: z.string().min(2).regex(nameRegex, nameError),
    restaurantPhone: z.string().regex(phoneRegex, phoneError),
    cuisine: z.string().min(1, "Required field."),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters long.")
      .max(100, "Address must not exceed 100 characters."),
    description: z
      .string()
      .max(400, "Description must not exceed 400 characters."),
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

export const MenuItemSchema = z.object({
  name: z
    .string()
    .min(2)
    .regex(/^[a-zA-Z0-9\s']+$/, "Please enter a valid dish name"),
  description: z
    .string()
    .max(300, "Description must not exceed 300 characters."),
  price: z
    .number()
    .multipleOf(0.01, "Invalid price, enter only 2 digits after the '.'"),
  // image: z.any(),
  image: z
    .any()
    .refine(
      (file) => file[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 2.5MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const MenuItemSchemaWithImageString = z.object({
  name: z
    .string()
    .min(2)
    .regex(/^[a-zA-Z0-9\s']+$/, "Please enter a valid dish name"),
  description: z
    .string()
    .max(300, "Description must not exceed 300 characters."),
  price: z
    .number()
    .multipleOf(0.01, "Invalid price, enter only 2 digits after the '.'"),
  image: z.any(),
  // image: z
  //   .any()
  //   .nullable() // Allow null or undefined values
  //   .optional() // Make the field optional
  //   .refine(
  //     (file) => file === null || file?.size <= MAX_FILE_SIZE,
  //     "Max image size is 2.5MB."
  //   )
  //   .refine(
  //     (file) => file === null || ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //     "Only .jpg, .jpeg, .png and .webp formats are supported."
  //   ),
});
