"use server";

import Validation from "@/app/_lib/classes/Validation";
import { Endpoints, Methods, Requester } from "@/app/_lib/global/requester";

type formSignupHandleReturnProps = {
  success: boolean;
  error: string;
}

export const formSignUpHandle = async (prevState: any, formData: FormData): Promise<formSignupHandleReturnProps | object> => {
  const { data, errors, success } = Validation.definition(formData, [
    {
      key: "email",
      validation: ["string", "nonempty"],
      message: "Email is required",
    },
    {
      key: "name",
      validation: ["string", "nonempty"],
      message: "Name is required",
    },
    {
      key: "country",
      validation: ["string", "nonempty"],
      message: "Country is required",
    },
    {
      key: "password",
      validation: ["string", "nonempty"],
      message: "Password is required",
    },
  ]);

  if (!success) {
    return errors;
  }

  const response = await Requester(Methods.post, Endpoints.userSignUp(), data);

  if (response.status !== 201) {
    return {
      success: false,
      error: response.data.message
    };
  }

  return {
    success: true,
    error: null
  };

};

export const getCountries = async () => {
  try {
    const response = await Requester(Methods.get, Endpoints.countriesList());
    if (response.status !== 200) {
      throw new Error("Could not get countries");
    }
    return response.data;
  } catch (e) { }
};
