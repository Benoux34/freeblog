import prisma from "@/lib/db";

async function getPosts() {
  const posts = await prisma.post.findMany({
    include: {
      tags: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  console.log(posts);

  return <main></main>;
}
