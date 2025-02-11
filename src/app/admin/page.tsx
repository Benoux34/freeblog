import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { generatePostId } from "@/utils/generateId";

async function getPostsByUserId() {
  const user = await currentUser();

  if (!user) {
    return [];
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
    include: {
      tags: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
}

export default async function Admin() {
  const posts = await getPostsByUserId();

  const newPostId = generatePostId();

  return (
    <main className="pt-28">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">All your posts</h1>
        <Link href={`/admin/${newPostId}`}>
          <Button variant={"outline"}>Create a post</Button>
        </Link>
      </div>

      <div>
        {posts.length === 0 ? (
          <p>You haven&apos;t created any posts yet.</p>
        ) : (
          <p>{posts.length}</p>
        )}
      </div>
    </main>
  );
}
