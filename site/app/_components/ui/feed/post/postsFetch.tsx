"use client"

import { post } from "@/app/page";
import CheckIcon from '@mui/icons-material/Check';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import PostContent from "./postContent";

type PostsFetchProps = {
  posts: post[]
}

const socket = io("http://localhost:3002", {
  transports: ["websocket"],
  reconnection: true,
});

export default function PostsFetch({ posts: initialPosts }: PostsFetchProps) {
  const [posts, setPosts] = useState<post[]>(initialPosts)
  const [showModalRefetch, setShowModalRefetch] = useState(false);
  const [refetchPosts, setRefetchPosts] = useState([])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('refetchPosts', (data: any) => {
      setShowModalRefetch(true)
      setRefetchPosts(data.feed);
    })

    setPosts(initialPosts)
  }, [])

  const refetchPostsHandle = () => {
    setPosts(refetchPosts);
    setShowModalRefetch(false);
  }

  return (
    <div className="flex flex-col gap-6 mt-5">
      {showModalRefetch && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          New post has been created, do you want to reload? <button onClick={refetchPostsHandle} className="bg-green-200 ml-5 p-2">Refetch posts</button>
        </Alert>
      )}

      {posts.map((post: post, index: number) => (
        <PostContent key={index} post={post} isEven={index % 2 === 0} />
      ))}
    </div>
  )
}