"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getActivities } from "@/app/api/explorer/action";

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
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Activités de Montagne
      </h1>

      {/* Recherche et filtres */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <Input
          placeholder="Rechercher une activité..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2"
        />
        <Tabs defaultValue="all" onValueChange={setDifficulty}>
          <TabsList className="flex gap-2">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="facile">Facile</TabsTrigger>
            <TabsTrigger value="moyen">Moyen</TabsTrigger>
            <TabsTrigger value="difficile">Difficile</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Liste des activités */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <Card key={activity.id}>
            <CardContent className="p-4">
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <CardTitle>{activity.name}</CardTitle>
              <p className="text-sm text-gray-600 mb-2">{activity.location}</p>
              <Badge
                className={
                  activity.difficulty === "facile"
                    ? "bg-green-500"
                    : activity.difficulty === "moyen"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }
              >
                {activity.difficulty.charAt(0).toUpperCase() +
                  activity.difficulty.slice(1)}
              </Badge>
              <Button className="mt-4 w-full">En savoir plus</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
