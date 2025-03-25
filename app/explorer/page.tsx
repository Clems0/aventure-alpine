"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Ajout de l'import Link
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getActivities } from "@/app/api/explorer/action";
import { MapPin, Clock, UserCheck, Mountain } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ActivitiesPage() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [activities, setActivities] = useState<any[]>([]); // Utilisez une interface spécifique au lieu de any

  // Chargement asynchrone des activités
  useEffect(() => {
    const loadActivities = async () => {
      const data = await getActivities(
        difficulty === "all" ? undefined : difficulty
      );
      setActivities(data);
    };
    loadActivities();
  }, [difficulty]);

  // Filtrage client-side pour la recherche
  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Explorez nos Aventures en Montagne
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Découvrez des expériences uniques adaptées à tous les niveaux, des
          randonnées tranquilles aux défis les plus techniques.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Rechercher une activité..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Difficulté" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            <SelectItem value="facile">Facile</SelectItem>
            <SelectItem value="moyen">Moyen</SelectItem>
            <SelectItem value="difficile">Difficile</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <Card
            key={activity.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 w-full">
              <Image
                src={activity.image}
                alt={activity.name}
                fill
                className="object-cover"
              />
              <Badge
                className={`absolute top-2 right-2 ${
                  activity.difficulty === "facile"
                    ? "bg-green-500"
                    : activity.difficulty === "moyen"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {activity.difficulty.charAt(0).toUpperCase() +
                  activity.difficulty.slice(1)}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-2">{activity.name}</h2>
              <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  {activity.location}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  3h-4h
                </div>
                <div className="flex items-center">
                  <UserCheck className="w-4 h-4 mr-2 text-gray-500" />
                  +12 ans
                </div>
                <div className="flex items-center">
                  <Mountain className="w-4 h-4 mr-2 text-gray-500" />
                  Niveau {activity.difficulty}
                </div>
              </div>
              <Separator className="mb-4" />
              <Link href={`/explorer/${activity.id}`}>
                <Button className="w-full">En savoir plus</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
