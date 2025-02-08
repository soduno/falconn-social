"use client"

import { postCommentsDummy } from "@/app/_dummyData/post";
import { post } from "@/app/page";
import Image from "next/image";
import { useState } from "react";
import PostComments from "./postComments";

interface PostContentProps {
  post: post,
  isEven: boolean
}

export default function PostContent({ post, isEven }: PostContentProps) {
  const [toggleComments, setToggleComments] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-5 shadow-[0_4px_10px_rgba(0,0,0,0.15)] rounded-2xl">
      <div className="pl-4 pt-4 flex flex-col justify-between gap-5">
        <div className="flex gap-5 items-center">
          <div><Image className="rounded-full" src="/images/profile.jpg" width={50} height={1} alt="Profile" /></div>
          <div className="flex flex-col">
            <strong>{post.user.name}</strong>
            <span className="text-slate-400">{post.createdAt}</span>
          </div>
          <div className="ml-auto">
            <span className="text-2xl material-symbols-rounded">more_vert</span>
          </div>
        </div>
        <div className="text-base">{post.content}</div>
      </div>
      <div className="bg-[#e6eefe] rounded-bl-2xl rounded-br-2xl">
        <div className="flex gap-3 opacity-60 p-3">
          <div className="flex items-center gap-1">
            <span className="text-sm material-symbols-rounded">visibility</span>
            <span className="text-sm">321</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm material-symbols-rounded">favorite</span>
            <span className="text-sm">Like</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => setToggleComments(!toggleComments)}>
            <span className="text-sm material-symbols-rounded">chat</span>
            <span className="text-sm">Comment</span>
          </div>
        </div>
        <div className={`${(toggleComments) ? '' : 'hidden'} p-5`}>
          <PostComments comments={postCommentsDummy} />
        </div>
      </div>
    </div>
  )
}