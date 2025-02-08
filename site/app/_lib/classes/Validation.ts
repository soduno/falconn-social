import { z, ZodError } from "zod";

type ValidationDefinitionReturnProps = {
  success: boolean;
  data: object | null;
  errors: {
    errors: object
  }
}

export default class Validation {
  static definition(
    formData: FormData | Record<string, any>,
    rules: { key: string; validation: string[]; message?: string }[]
  ): ValidationDefinitionReturnProps {

    if (formData instanceof FormData) {
      formData = Object.fromEntries(formData.entries());
    }

    let schema = z.object(
      rules.reduce((acc, rule) => {
        let fieldSchema: z.ZodTypeAny = z.any();

        if (rule.validation.includes("string")) fieldSchema = z.string();

        if (rule.validation.includes("email")) fieldSchema = z.string().email();

        if (rule.validation.includes("nonempty")) {
          fieldSchema = (fieldSchema as z.ZodString).min(1, rule.message || "Field cannot be empty");
        }

        acc[rule.key] = fieldSchema;
        return acc;
      }, {} as Record<string, z.ZodTypeAny>)
    );

    try {
      const data = schema.parse(formData);
      return { data, success: true, errors: { errors: {} } };
    } catch (error) {
      if (error instanceof ZodError) {
        const formFieldErrors = error.flatten().fieldErrors;
        const formattedErrors = Object.keys(formFieldErrors).reduce(
          (acc, key) => ({
            ...acc,
            ...(formFieldErrors[key] && { [key]: formFieldErrors[key][0] }),
          }),
          {} as Record<string, string>
        );

        return {
          data: null,
          success: false,
          errors: {
            errors: formattedErrors
          }
        };
      }
    }

    return { data: null, success: false, errors: { errors: ["Another error was thrown"] } };
  }
}
