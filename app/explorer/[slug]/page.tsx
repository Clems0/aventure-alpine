"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getActivityBySlug } from "@/app/api/explorer/action";
import {
  MapPin,
  Clock,
  Users,
  Mountain,
  Star,
  Calendar,
  Shield,
  Info,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { ModalReservation } from "@/components/layout/Reservation/ModalReservation";
import Header from "@/components/navbar";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ActivityPage({ params }: PageProps) {
  // const activities = await getUserReservations();

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
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  if (!activity) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <div className="relative h-[500px]">
        <img
          src={activity.image}
          alt={activity.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-4">
                <Badge
                  className={
                    activity.difficulty === "facile"
                      ? "bg-emerald-500"
                      : activity.difficulty === "moyen"
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }
                >
                  {activity.difficulty.charAt(0).toUpperCase() +
                    activity.difficulty.slice(1)}
                </Badge>
                {/* <div className="flex items-center text-amber-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1">4.8</span>
                  <span className="text-gray-400 ml-1">(128 avis)</span>
                </div> */}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {activity.name}
              </h1>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-2" />
                {activity.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-white/5 border-slate-700">
                <TabsTrigger value="overview">Aperçu</TabsTrigger>
                <TabsTrigger value="details">Détails</TabsTrigger>
                {/* <TabsTrigger value="equipment">Équipement</TabsTrigger> */}
                {/* <TabsTrigger value="reviews">Avis</TabsTrigger> */}
              </TabsList>

              <TabsContent value="overview">
                <Card className="bg-white/5 border-slate-700 p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Description
                  </h2>
                  <p className="text-gray-400">{activity.description}</p>
                </Card>
              </TabsContent>

              <TabsContent value="details">
                <Card className="bg-white/5 border-slate-700 p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Informations détaillées
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">
                        Programme
                      </h3>
                      <ul className="space-y-2 text-gray-400">
                        <li>• Rendez-vous à 8h au point de départ</li>
                        <li>• Briefing et vérification du matériel</li>
                        <li>• Ascension {activity.duration} heurs</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">
                        Points clés
                      </h3>
                      <ul className="space-y-2 text-gray-400">
                        <li>• Altitude max : {activity.altitude} mètres</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="equipment">
                <Card className="bg-white/5 border-slate-700 p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Équipement nécessaire
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">
                        Équipement fourni
                      </h3>
                      <ul className="space-y-2">
                        {["Casque", "Baudrier", "Mousquetons", "Cordes"].map(
                          (item) => (
                            <li
                              key={item}
                              className="flex items-center text-gray-400"
                            >
                              <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">
                        À apporter
                      </h3>
                      <ul className="space-y-2">
                        {[
                          "Chaussures de montagne",
                          "Vêtements chauds",
                          "Sac à dos",
                          "Eau (2L minimum)",
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-center text-gray-400"
                          >
                            <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="bg-white/5 border-slate-700 p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Avis des participants
                  </h2>
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div
                        key={review}
                        className="border-b border-slate-700 last:border-0 pb-6 last:pb-0"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center text-white font-semibold">
                              JD
                            </div>
                            <div className="ml-3">
                              <h4 className="text-white font-medium">
                                Jean Dupont
                              </h4>
                              <p className="text-gray-400 text-sm">
                                12 Mars 2024
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center text-amber-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="w-4 h-4 fill-current"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-400">
                          Une expérience incroyable ! Le guide était très
                          professionnel et les paysages à couper le souffle.
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/5 border-slate-700 p-6">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-white">
                  {activity.price} €
                </p>
                <p className="text-gray-400">par personne</p>
              </div>
              <ModalReservation
                activityId={activity.id}
                activityName={activity.name}
                price={activity.price}
              />

              <div className="space-y-4">
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{activity.duration} heures</span>
                </div>

                <div className="flex items-center text-gray-400">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Guide certifié</span>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 border-slate-700 p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Informations importantes
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Annulation gratuite jusqu'à 48h avant</li>
                <li>• Âge minimum : 12 ans</li>
                <li>• Équipement technique fourni</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
