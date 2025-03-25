"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getActivityBySlug } from "@/app/api/explorer/action";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ActivityPage({ params }: PageProps) {
  const [activity, setActivity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const data = await getActivityBySlug(params.slug);
        if (!data) {
          notFound();
        }
        setActivity(data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'activité:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadActivity();
  }, [params.slug]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!activity) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <img
          src={activity.image}
          alt={activity.name}
          className="w-full h-[400px] object-cover rounded-lg mb-6"
        />
        <h1 className="text-4xl font-bold mb-4">{activity.name}</h1>
        <div className="flex items-center gap-4 mb-6">
          <p className="text-gray-600">{activity.location}</p>
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
        </div>
        <div className="prose max-w-none">
          <p>{activity.description}</p>
        </div>
      </div>
    </div>
  );
}
