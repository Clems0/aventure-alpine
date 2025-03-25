import { Calendar, Clock, MapPin, Mountain } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { getUserReservations } from "@/app/api/reservations/action";

import Image from "next/image";

export default async function CardAventures() {
  const reservation = await getUserReservations();

  return (
    <div>
      {reservation?.map((reservation) => (
        <Card key={reservation?.id} className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 h-48 md:h-auto bg-gray-200">
              <Image
                src={reservation?.activity?.image}
                alt="Adventure"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-semibold mb-1">
                    {reservation?.activity.name}
                  </h4>
                  <p className="text-gray-500 flex items-center text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" /> Chamonix, France
                  </p>
                </div>
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

              <p className="text-gray-600 mb-4 line-clamp-2">
                {reservation?.activity.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{reservation?.participants}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{reservation?.activity.duration} heures</span>
                </div>
                <div className="flex items-center">
                  <Mountain className="h-4 w-4 mr-1" />
                  <span>{reservation?.activity.altitude} mètres</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
