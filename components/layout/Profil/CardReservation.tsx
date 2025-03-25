"use client";

import { useEffect, useState } from "react";
import { getUserReservations } from "@/app/api/reservations/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Reservation = {
  id: string;
  activity: { name: string };
  date: string;
  status: "confirmed" | "pending" | "canceled";
};

export function CardReservation() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const data = await getUserReservations();
        setReservations(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchReservations();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prochaines aventures</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div key={reservation.id} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">{reservation.activity.name}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(reservation.date).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <div className="flex items-center mt-1">
                    {reservation.status === "pending" && (
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-xs">
                        En attente
                      </Badge>
                    )}
                    {reservation.status === "confirmed" && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-xs">
                        Terminé
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Aucune réservation trouvée.</p>
          )}
        </div>
        <Link href="/profil/reservation">
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-4 text-blue-600"
          >
            Voir toutes les aventures planifiées
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
