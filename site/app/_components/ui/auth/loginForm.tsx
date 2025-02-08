"use client";

import SubmitButton from "@/app/_components/ui/elements/inputs/submitButton";
import { formSigninHandle } from "@/app/_lib/actions/login/action";
import { Alert } from "@mui/material";
import Link from "next/link";
import router from "next/router";
import { useActionState, useEffect } from "react";

const initialState = {
  errors: {
    email: "",
    password: "",
  },
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    formSigninHandle,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      router.push("/");
    }
  }, [state]);

  useEffect(() => {
    sessionStorage.removeItem("userCreated")
  }, [])

  const handleFormSubmit = () => {

  }

  return (
    <>

      {sessionStorage.getItem('userCreated') && (
        <Alert className="mb-3" severity="success">User has been created. Please activate using link in confirmation email</Alert>
      )}

      <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
      <form onSubmit={handleFormSubmit} action={formAction} className="mt-6">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {state?.errors?.email && (
            <p className="text-red-500 text-sm">{state.errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {state.errors?.password && (
            <p className="text-red-500 text-sm">{state.errors.password}</p>
          )}
        </div>
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2">Remember me</span>
          </label>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>
        <SubmitButton placeholder={`Login`} />
      </form>

      <Link
        href="/signup"
        className="flex justify-center text-center mt-4 text-sm flex text-center text-blue-500 hover:underline"
      >
        Don't have an account? Create an account here
      </Link>
    </>
  );
}
