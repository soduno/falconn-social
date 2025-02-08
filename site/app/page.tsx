import CreatePost from "./_components/ui/feed/post/createContent";
import PostsFetch from "./_components/ui/feed/post/postsFetch";
import { getPostsForUser } from "./_lib/actions/posts/action";

export type post = {
  user: {
    name: string
  },
  content: string;
  mediaUrls: string[];
  createdAt: string;
}

export default async function Home() {
  const posts = await getPostsForUser();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <span className="font-bold text-2xl">Feeds</span>
      </div>
      <CreatePost />
      <PostsFetch posts={posts} />

    </div>
  );
}
