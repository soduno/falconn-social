import { handleActivateUser } from "@/app/_lib/auth/activation";

type ActivationPageProps = {
  params: {
    hash: string;
  };
};

export default async function Page({ params }: ActivationPageProps) {
  const { hash } = await params;
  const activated = await handleActivateUser(hash);

  return (
    <div className="flex justify-center items-center m-5">
      {activated ? (
        <h2 className="text-3xl">Your account has been activated</h2>
      ) : (
        <h2 className="text-3xl">Activation expired</h2>
      )}
    </div>
  )
}