import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SocialLogin } from "@/components/layout/Login/SocialLogin";
import { Logo } from "@/components/layout/Login/Logo";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function LoginPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-sm rounded-lg">
        <Logo />

        <h1 className="text-white text-2xl font-semibold mb-2">Se connecter</h1>
        <p className="text-gray-400 mb-8">
          Connectez-vous pour accéder à votre compte.
        </p>

        <form
          action={async (formData) => {
            "use server";
            try {
              await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirectTo: resolvedSearchParams?.callbackUrl ?? "/profil",
              }); // Retirez les accolades supplémentaires qui étaient ici
            } catch (error) {
              if (error instanceof AuthError) {
                console.error("Auth error:", error);
              }
              throw error;
            }
          }}
        >
          <div className="mb-4">
            <label className="text-gray-300 block mb-2" htmlFor="email">
              Adresse e-mail
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="bg-slate-800/50 border-slate-700 text-white"
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-300 block mb-2" htmlFor="password">
              Mot de passe
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="bg-slate-800/50 border-slate-700 text-white"
            />
          </div>

          <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-500">
            Se connecter
          </Button>
        </form>
        <SocialLogin />
        <p className="text-gray-500 text-sm text-center mt-8">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-sky-400 hover:text-sky-300">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
