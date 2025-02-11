import { PostForm } from "@/components/Posts/CreatePost/Form/PostForm";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

async function getPost(postId: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      tags: true,
    },
  });

  return post;
}

export default async function Post({
  params: { postId },
}: {
  params: { postId: string };
}) {
  if (!postId) redirect("/");

  const post = await getPost(postId);
  console.log(post);

  return (
    <main className="pt-28">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">Create your post</h1>
      </div>

      <div className="w-1/2">
        <PostForm postId={postId} initialData={post} />
      </div>
    </main>
  );
}
