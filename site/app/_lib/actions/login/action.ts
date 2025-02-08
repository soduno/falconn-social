"use server";

import { z } from "zod";
import Token from "../../classes/Token";
import { Endpoints, Methods, Requester } from "../../global/requester";

export const formSigninHandle = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const schema = z.object({
      email: z.string().email({ message: "Invalid email format" }),
      password: z.string().nonempty({ message: "Password is required" }),
    });

    const validated = schema.safeParse(Object.fromEntries(formData.entries()));

    if (!validated.success) {
      const formFieldErrors = validated.error.flatten().fieldErrors;

      return {
        errors: {
          ...(formFieldErrors?.email && { email: formFieldErrors.email[0] }),
          ...(formFieldErrors?.password && {
            password: formFieldErrors.password[0],
          }),
        },
      };
    }

    const response = await Requester(Methods.post, Endpoints.signin(), {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (response.status !== 201) {
      throw new Error("Something went wrong");
    }

    const token = response.data.token ?? null;

    if (!token) {
      throw new Error("Token is expired or invalid");
    }

    if (!Token.store(token)) {
      throw new Error("Token did not set, possible invalid");
    }

    return {
      success: true,
      errors: null,
    };
  } catch (error: any) {
    return {
      success: false,
      errors: error.message,
    };
  }
};
