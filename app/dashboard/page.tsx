"use client";
import Navbar from "@/components/navbar";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mountain,
  Users,
  Trophy,
  Calendar,
  ArrowUpRight,
  Clock,
} from "lucide-react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold">Tableau de bord</h1>
            <p className="text-gray-400 mt-2">
              Bienvenue, {session?.user?.name || session?.user?.email}
            </p>
          </div>
          <Button className="bg-sky-600 hover:bg-sky-500">
            Nouvelle Aventure
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-slate-700 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <Mountain className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Sommets Conquis</p>
                <p className="text-white text-2xl font-semibold">12</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-slate-700 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Compagnons</p>
                <p className="text-white text-2xl font-semibold">48</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-slate-700 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Trophées</p>
                <p className="text-white text-2xl font-semibold">5</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-slate-700 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-500/10 rounded-lg">
                <Clock className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Temps Total</p>
                <p className="text-white text-2xl font-semibold">127h</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Adventures */}
          <Card className="bg-white/5 backdrop-blur-sm border-slate-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-xl font-semibold">
                Prochaines Aventures
              </h2>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                Voir tout
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                    <Mountain className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">Mont Blanc</h3>
                    <p className="text-gray-400 text-sm">4,809 m • Difficile</p>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">28 Juin</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/5 backdrop-blur-sm border-slate-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-xl font-semibold">
                Activité Récente
              </h2>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                Voir tout
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-6">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-white">
                      Trophée débloqué : Alpiniste Confirmé
                    </p>
                    <p className="text-gray-400 text-sm">Il y a 2 heures</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      {/* // <>
    //   <Navbar />
    //   {session?.user ? (
    //     <>
    //       {session?.user?.image && (
    //         <Image src={session.user.image} width={50} height={50} alt="" />
    //       )}
    //       <button onClick={() => signOut()}>Logout</button>
    //     </>
    //   ) : (
    //     <Link href="/login">
    //       <button>Login</button>
    //     </Link>
    //   )}
    // </> */}
    </>
  );
}
