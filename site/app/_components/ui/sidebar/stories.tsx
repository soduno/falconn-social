import { storiesData } from "@/app/_dummyData/stories"
import Image from "next/image"

export default function Stories() {

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <div>
          <span className="font-bold text-2xl">Stories</span>
        </div>
        <div className="flex justify-between gap-3">
          {storiesData.map((story, index) => (
            <div key={index} className="w-[50%] border border-sky-300 h-[250px] flex justify-center rounded-3xl relative" style={{
              backgroundImage: `url(${story.bg})`,
              backgroundSize: 'cover'
            }}>
              <div className="bg-white w-[95%] h-[50px] absolute bottom-1 rounded-3xl">
                <div className="flex gap-1 items-center pl-2 h-full p-1">
                  <Image width={35} height={0} className="rounded-full" alt="Profile" src={story.authorImage} />
                  <span>{story.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}