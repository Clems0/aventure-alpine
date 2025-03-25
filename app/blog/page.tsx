import CreatePost from "@/components/layout/Blog/CreatePost";
import PostList from "@/components/layout/Blog/PostList";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";

import Header from "@/components/navbar";

export default async function BlogPage() {
  const session = await auth();

  // Optional: Redirect if not logged in
  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">
            Blog d'Aventures
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with create post form */}
            <div className="lg:col-span-1">
              {session ? (
                <CreatePost />
              ) : (
                <div className="p-6 border rounded-lg shadow-sm bg-white/10 backdrop-blur-sm text-white">
                  <h3 className="text-lg font-medium mb-2">
                    Partagez votre aventure
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Connectez-vous pour partager vos expériences en montagne.
                  </p>
                  <a
                    href="/login"
                    className="block text-center py-2 px-4 bg-sky-600 hover:bg-sky-500 rounded-md text-white font-medium"
                  >
                    Se connecter
                  </a>
                </div>
              )}
            </div>

            {/* Main content with posts */}
            <div className="lg:col-span-3">
              <Suspense
                fallback={
                  <div className="text-white">
                    Chargement des publications...
                  </div>
                }
              >
                <PostList />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
