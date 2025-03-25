// import { GamePreview } from "@/components/GamePreview";
import { Logo } from "@/components/layout/Login/Logo";
//import { SignUpForm } from "@/components/SignUpForm";
import Link from "next/link";
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mountain, Compass, Snowflake, BookOpen } from "lucide-react";
import Header from "@/components/navbar";

export default async function Home() {
  // const session = await auth();

  // if (session) {
  //   redirect("/dashboard");
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      {/* <header className="fixed w-full z-50 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/activities"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Activités
              </Link>
              <Link
                href="/hiking"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Randonnée
              </Link>
              <Link
                href="/climbing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Escalade
              </Link>
              <Link
                href="/ski"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Ski
              </Link>
              <Link
                href="/blog"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Blog
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                >
                  Connexion
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-sky-600 hover:bg-sky-500">
                  S'inscrire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header> */}
      <Header />
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070"
            alt="Mountain landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Découvrez l'aventure en montagne
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Explorez les plus beaux sommets, partagez vos expériences et
              rejoignez une communauté passionnée de montagne.
            </p>
            <div className="flex space-x-4">
              <Link href="/explorer">
                <Button className="bg-sky-600 hover:bg-sky-500 text-lg px-8">
                  Commencer l'aventure
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-white text-black hover:bg-white/10 hover:text-white text-lg px-8"
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Nos activités populaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/hiking" className="group">
              <div className="bg-white/5 rounded-lg p-6 transition-all hover:bg-white/10">
                <div className="w-12 h-12 bg-sky-600/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sky-600/20 transition-colors">
                  <Mountain className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Randonnée
                </h3>
                <p className="text-gray-400">
                  Explorez les sentiers de montagne et découvrez des paysages à
                  couper le souffle.
                </p>
              </div>
            </Link>
            <Link href="/climbing" className="group">
              <div className="bg-white/5 rounded-lg p-6 transition-all hover:bg-white/10">
                <div className="w-12 h-12 bg-sky-600/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sky-600/20 transition-colors">
                  <Compass className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Escalade
                </h3>
                <p className="text-gray-400">
                  Relevez le défi des voies d'escalade et atteignez de nouveaux
                  sommets.
                </p>
              </div>
            </Link>
            <Link href="/ski" className="group">
              <div className="bg-white/5 rounded-lg p-6 transition-all hover:bg-white/10">
                <div className="w-12 h-12 bg-sky-600/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sky-600/20 transition-colors">
                  <Snowflake className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Ski</h3>
                <p className="text-gray-400">
                  Dévalez les pistes enneigées et vivez des sensations uniques.
                </p>
              </div>
            </Link>
            <Link href="/blog" className="group">
              <div className="bg-white/5 rounded-lg p-6 transition-all hover:bg-white/10">
                <div className="w-12 h-12 bg-sky-600/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sky-600/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Blog</h3>
                <p className="text-gray-400">
                  Lisez et partagez des récits d'aventures en montagne.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-sky-600 to-sky-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à commencer votre aventure ?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Rejoignez notre communauté de passionnés de montagne et commencez à
            planifier vos prochaines aventures.
          </p>
          <Button className="bg-white text-sky-600 hover:bg-gray-100 text-lg px-8">
            S'inscrire gratuitement
          </Button>
        </div>
      </section>
    </div>
  );
}
