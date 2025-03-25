import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function PostList() {
  const posts = await prisma.post.findMany({ include: { user: true } });

  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="border rounded p-4">
          <Image
            src={post.imageUrl}
            alt="Post"
            className="w-full h-64 object-cover rounded"
          />
          <p className="text-sm">{post.caption}</p>
          <span className="text-gray-500 text-xs">
            Publié par {post.user.name}
          </span>
        </div>
      ))}
    </div>
  );
}
