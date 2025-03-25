"use client";

import { useEffect, useState } from "react";
import { getUserReservations } from "@/app/api/reservations/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronRight, MapPin, Mountain, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

type Reservation = {
  id: string;
  activity: {
    name: string;
    location: string;
    difficulty: string;
  };
  date: string;
  status: "confirmed" | "pending" | "canceled";
  startTime: string;
  endTime: string;
  participants: number;
};

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const data = await getUserReservations();
        setReservations(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Impossible de charger les réservations");
        setLoading(false);
      }
    }

    fetchReservations();
  }, []);

  const getStatusBadge = (status: Reservation["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            En attente
          </Badge>
        );
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Confirmé
          </Badge>
        );
      case "canceled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Annulé
          </Badge>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500">
          Chargement des réservations...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-16 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Mes aventures planifiées</h1>

        {reservations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Mountain className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500">
              Aucune aventure planifiée pour le moment
            </p>
            <Button className="mt-4" asChild>
              <Link href="/adventures">Découvrir des aventures</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {reservations.map((reservation) => (
              <Card key={reservation.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto bg-gray-200">
                    <Image
                      src={`/api/placeholder/400/300`}
                      alt={reservation.activity.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-semibold mb-1">
                          {reservation.activity.name}
                        </h4>
                        <p className="text-gray-500 flex items-center text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {reservation.activity.location}
                        </p>
                      </div>
                      {getStatusBadge(reservation.status)}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {new Date(reservation.date).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          {reservation.startTime} - {reservation.endTime}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {/* <Users className="h-4 w-4 mr-1" /> */}
                        <span>{reservation.participants} participants</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Badge className="bg-blue-100 text-blue-800">
                        {reservation.activity.difficulty}
                      </Badge>
                      <Button variant="outline" asChild>
                        <Link href={`/reservations/${reservation.id}`}>
                          Détails <ChevronRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
