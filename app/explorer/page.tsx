"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getActivities } from "@/app/api/explorer/action";
import {
  MapPin,
  Clock,
  Users,
  Mountain,
  Search,
  Filter,
  Star,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ExplorerPage() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const loadActivities = async () => {
      const data = await getActivities(
        difficulty === "all" ? undefined : difficulty
      );
      setActivities(data);
    };
    loadActivities();
  }, [difficulty]);

  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="relative h-[400px]">
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Explorez nos Aventures en Montagne
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Découvrez des expériences uniques adaptées à tous les niveaux, des
              randonnées tranquilles aux défis les plus techniques.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher une activité..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white/5 border-slate-700 text-white"
              />
            </div>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-[180px] bg-white/5 border-slate-700 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Difficulté" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les difficultés</SelectItem>
                <SelectItem value="facile">Facile</SelectItem>
                <SelectItem value="moyen">Moyen</SelectItem>
                <SelectItem value="difficile">Difficile</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <Link href={`/explorer/${activity.id}`} key={activity.id}>
              <Card className="bg-white/5 border-slate-700 overflow-hidden hover:border-sky-500 transition-all hover:scale-[1.02]">
                <div className="relative h-48">
                  <Image
                    src={activity.image}
                    alt={activity.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge
                    className={`absolute top-4 right-4 ${
                      activity.difficulty === "facile"
                        ? "bg-emerald-500"
                        : activity.difficulty === "moyen"
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                  >
                    {activity.difficulty.charAt(0).toUpperCase() +
                      activity.difficulty.slice(1)}
                  </Badge>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">
                      {activity.name}
                    </h3>
                    {/* <div className="flex items-center text-amber-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm">4.8</span>
                    </div> */}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {activity.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {activity.duration || "1 heure"} heures
                    </div>

                    <div className="flex items-center">
                      <Mountain className="w-4 h-4 mr-2" />
                      {activity.altitude || "1500m"}
                    </div>
                  </div>
                  <Button className="w-full bg-sky-600 hover:bg-sky-500">
                    Voir le détail
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
