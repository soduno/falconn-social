import { connections } from "@/app/_dummyData/connections";
import PeopleList from "../lists/peopleList";

export default function ConnectionRelatives() {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <div>
          <span className="font-bold text-2xl">Maybe you know?</span>
        </div>
        <div>
          <div className="flex flex-col gap-5">
            {connections.map((connection, index) => (
              <PeopleList key={index} connection={connection} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}