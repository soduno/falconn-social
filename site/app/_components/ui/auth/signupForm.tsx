"use client";

import InputEmail from "@/app/_components/ui/elements/inputs/inputEmail";
import InputPassword from "@/app/_components/ui/elements/inputs/inputPassword";
import InputText from "@/app/_components/ui/elements/inputs/inputText";
import SelectBox from "@/app/_components/ui/elements/inputs/selectBox";
import SubmitButton from "@/app/_components/ui/elements/inputs/submitButton";
import { formSignUpHandle } from "@/app/_lib/actions/signup/action";
import { Country } from "@/app/_lib/types/countries";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { string } from "zod";

const initialState = {
  errors: {},
  success: false,
  error: string
};

interface SignupFormProps {
  countries: Country[];
}

export default function SignupForm({
  countries: initialCountries,
}: SignupFormProps) {
  const [state, formAction] = useActionState(formSignUpHandle, initialState);
  const router = useRouter();

  const countries = initialCountries.map(({ code, name, ...rest }) => ({
    key: code,
    value: name,
    ...rest,
  }));

  useEffect(() => {
    if ("success" in state && state.success) {
      sessionStorage.setItem("userCreated", "true");
      router.push("/login");
    }
  }, [state])

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-800">Create an account</h2>
      <form action={formAction} className="mt-6">
        <div className="mb-4">
          <InputText state={state} label={`Name`} name={`name`} />
        </div>
        <div className="mb-4">
          <SelectBox
            entries={countries}
            state={state}
            label={`Country`}
            name={`country`}
          />
        </div>
        <div className="mb-4">
          <InputEmail state={state} label={`Email`} name={`email`} />
        </div>
        <div className="mb-4">
          <InputPassword state={state} label={`Password`} name={`password`} />
        </div>
        <SubmitButton placeholder={`Signup`} />
      </form>
    </>
  );
}
