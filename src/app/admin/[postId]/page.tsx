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
  params,
}: {
  params: Promise<{ post_id: string }>;
}) {
  const { post_id } = await params;

  if (!post_id) redirect("/");

  const post = await getPost(post_id);
  console.log(post);

  return (
    <main className="pt-28">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">Create your post</h1>
      </div>

      <div className="w-1/2">
        <PostForm postId={post_id} />
      </div>
    </main>
  );
}
