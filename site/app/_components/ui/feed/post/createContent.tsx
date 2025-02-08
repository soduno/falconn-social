"use client";

import { useState } from "react";
import DefaultButton from "@/app/_components/ui/elements/inputs/defaultBtn";

export default function CreatePost() {
  const [opacity, setOpacity] = useState(true);

  return (
    <div
      className={`bg-[#f4f1f2] rounded-3xl p-5 ${opacity ? "opacity-50" : ""}`}
      onMouseEnter={() => setOpacity(false)}
      onMouseLeave={() => setOpacity(true)}
    >
      <div className="flex relative items-center">
        <img
          src="/images/profile.jpg"
          className="w-[40px] rounded-full absolute left-2"
          alt=""
        />
        <input
          type="text"
          className="outline-none bg-white w-full h-[55px] rounded-3xl pl-16"
          placeholder="Share something exiting"
        />
      </div>
      <div className="flex mt-3">
        <div className="flex w-full justify-between h-full items-center">
          <ul className="flex gap-5 text-sm">
            <li>
              <span className="flex items-center gap-1">
                <i className="text-sm material-symbols-rounded">
                  photo_library
                </i>
                Image
              </span>
            </li>
            <li>
              <span className="flex items-center gap-1">
                <i className="text-sm material-symbols-rounded">pin_drop</i>
                Location
              </span>
            </li>
            <li>
              <span className="flex items-center gap-1">
                <i className="text-sm material-symbols-rounded">public</i>
                Public
              </span>
            </li>
          </ul>

          <DefaultButton placeholder="Share" />
        </div>
      </div>
    </div>
  );
}
