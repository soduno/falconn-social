import Session from "@/app/_lib/classes/Session";

export default async function Avatar() {
  const session = await Session.get();
  return (
    <div className="flex flex-col gap-5 items-center justify-center my-5">
      <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
        <img src="/images/profile.jpg" />
      </div>
      <div>
        <span className="font-bold text-lg">{session.name}</span>
      </div>
    </div>
  )
}