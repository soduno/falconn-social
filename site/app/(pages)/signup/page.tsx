import SignupForm from "@/app/_components/ui/auth/signupForm";
import { getCountries } from "@/app/_lib/actions/signup/action";

export default async function Page() {
  const countries = await getCountries();
  return (
    <>
      <SignupForm countries={countries} />
    </>
  );
}
