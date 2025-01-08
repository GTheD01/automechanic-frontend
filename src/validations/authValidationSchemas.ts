import { z } from "zod";

const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{8,}$/;

export const RegisterUserSchema = z
  .object({
    firstName: z.string().min(1, "First name must be at least 1 character"),
    lastName: z.string().min(1, "Last name must be at least 1 character"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .regex(
        PASSWORD_REGEX,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      ),
    repeatPassword: z
      .string()
      .regex(
        PASSWORD_REGEX,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      ),
  })
  .refine(
    (values) => {
      return values.password === values.repeatPassword;
    },
    {
      message: "Passwords must match!",
      path: ["repeatPassword"],
    }
  );

export const LoginUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password must be at least 1 character"),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const ResetPasswordConfirmSchema = z
  .object({
    email: z.string().email("Invalid email"),
    token: z.string().min(1, "Token must be at least 1 character"),
    newPassword: z
      .string()
      .regex(
        PASSWORD_REGEX,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      ),
    repeatNewPassword: z
      .string()
      .regex(
        PASSWORD_REGEX,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      ),
  })
  .refine(
    (values) => {
      return values.newPassword === values.repeatNewPassword;
    },
    {
      message: "Passwords must match!",
      path: ["repeatPassword"],
    }
  );
