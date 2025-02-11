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
        imageUrl: imageUrl || "",
        authorId: user.id,
        tags: {
          connectOrCreate: Array.isArray(tags)
            ? tags.map((tagName: string) => ({
                where: { name: tagName.trim() },
                create: { name: tagName.trim() },
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
    console.error("Post creation error:", error);
    return new Response(
      JSON.stringify({
        error: "Error creating post",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
