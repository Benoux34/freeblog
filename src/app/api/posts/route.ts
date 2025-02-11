import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return Response.json(posts);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    const { title, content, imageUrl, tags, postId } = data;

    const post = await prisma.post.create({
      data: {
        id: postId,
        title,
        content,
        imageUrl,
        authorId: user.id,
        tags: {
          create: Array.isArray(tags)
            ? tags.map((tag: string) => ({
                name: tag,
              }))
            : [],
        },
      },
      include: {
        tags: true,
      },
    });

    return Response.json(post);
  } catch (error) {
    console.error(error);
    return new Response("Error creating post", { status: 500 });
  }
}
