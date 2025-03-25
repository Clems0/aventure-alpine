import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { imageUrl, caption } = await req.json();

  const post = await prisma.post.create({
    data: {
      imageUrl,
      caption,
      userId: session.user.id,
    },
  });

  return NextResponse.json(post);
}
