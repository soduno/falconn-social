"use client"

import { PostComment } from "@/app/_dummyData/post";
import DateTime from "@/app/_lib/classes/Date";
import Image from "next/image";
import { useState } from "react";

type PostCommentProps = {
  comments: PostComment[];
};

function CommentTree({
  comment,
  comments,
}: {
  comment: PostComment;
  comments: PostComment[];
}) {
  const childComments = comments.filter((c) => c.parent === comment.id);
  const date = DateTime.format(comment.date);
  return (
    <li className="flex flex-col gap-2">
      <div className="flex gap-3 items-start">
        <Image
          src={`/profile.jpg`}
          width={30}
          height={30}
          alt="Profile Image"
          className="rounded-full"
        />
        <div>
          <span>
            <strong>{comment.author}</strong> -{" "}
            {date}
          </span>
          <p>{comment.comment}</p>
        </div>
      </div>

      {childComments.length > 0 && (
        <ul className="pl-8 border-l border-slate-300">
          {childComments.map((child) => (
            <CommentTree key={child.id} comment={child} comments={comments} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function PostComments({ comments }: PostCommentProps) {
  const [limitPosts, setLimitPosts] = useState<number>(4);
  const topLevelComments = comments.filter((comment) => !comment.parent);
  const limitedTopLevelComments = topLevelComments.slice(0, limitPosts);

  return (
    <>
      <ul className="flex flex-col gap-5">
        {limitedTopLevelComments.map((comment) => (
          <CommentTree key={comment.id} comment={comment} comments={comments} />
        ))}
      </ul>
      <button onClick={() => setLimitPosts(limitPosts + 4)} className="w-full mt-4 bg-[#e6eefe] p-3 rounded-2xl">
        Load more
      </button>
    </>
  );
}
