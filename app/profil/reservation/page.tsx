"use client";

import { useEffect, useState } from "react";
import {
  getUserReservations,
  deleteReservation,
  updateReservation,
} from "@/app/api/reservations/action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  ChevronRight,
  MapPin,
  Mountain,
  Clock,
  Trash,
  Edit,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const data = await getUserReservations();
        setReservations(data);
      } catch (error) {
        setError("Impossible de charger les réservations");
      } finally {
        setLoading(false);
      }
    }
    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteReservation(id);
      setReservations((prev) => prev.filter((res) => res.id !== id));
    } catch (error) {
      console.error("Erreur suppression :", error);
    }
  };

  if (loading) return <div>Chargement des réservations...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

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
                  <div className="md:w-1/3 h-32 md:h-64 bg-gray-200">
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
                      <h4 className="text-xl font-semibold">
                        {reservation.activity.name}
                      </h4>
                      <Badge className="bg-blue-100 text-blue-800">
                        {reservation.activity.difficulty}
                      </Badge>
                    </div>
                    <div className="text-gray-500 flex items-center text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />{" "}
                      {reservation.activity.location}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            Options <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              updateReservation({
                                id: reservation.id,
                                data: {
                                  status: "canceled",
                                },
                              })
                            }
                          >
                            <Edit className="h-4 w-4 mr-2" /> Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(reservation.id)}
                          >
                            <Trash className="h-4 w-4 mr-2 text-red-600" />{" "}
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
