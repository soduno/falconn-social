import Image from "next/image";
import DefaultButton from "@/app/_components/ui/elements/inputs/defaultBtn";

export default function PeopleList({ connection }) {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex gap-3 items-center">
        <Image
          width={50}
          height={0}
          className="rounded-full"
          alt="Profile"
          src={connection.image}
        />
        <span>{connection.name}</span>
      </div>
      <div>
        <DefaultButton classes="font-bold" placeholder={`Request`} />
      </div>
    </div>
  );
}
