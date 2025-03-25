import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function PostList() {
  try {
    // Check if the Post model exists in the Prisma client
    if (!prisma.post) {
      return (
        <div className="text-center p-8 border rounded-lg bg-white/5 backdrop-blur-sm">
          <p className="text-red-400">
            Le modèle Post n'est pas disponible. Veuillez vérifier votre schéma
            Prisma.
          </p>
        </div>
      );
    }

    const posts = await prisma.post.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    if (posts.length === 0) {
      return (
        <div className="text-center p-8 border rounded-lg bg-white/5 backdrop-blur-sm">
          <p className="text-gray-400">Aucune publication pour le moment.</p>
          <p className="text-gray-500 text-sm mt-2">
            Soyez le premier à partager votre aventure !
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white/5 backdrop-blur-sm"
          >
            <Image
              src={post.imageUrl}
              alt="Post"
              width={500}
              height={300}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <p className="text-sm mb-2 text-black">{post.caption}</p>
              <span className="text-gray-400 text-xs">
                Publié par {post.user.name || "Utilisateur anonyme"}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <div className="text-center p-8 border rounded-lg bg-white/5 backdrop-blur-sm">
        <p className="text-red-400">
          Une erreur est survenue lors du chargement des publications.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Détail: {error instanceof Error ? error.message : String(error)}
        </p>
      </div>
    );
  }
}
