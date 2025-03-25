"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { createReservation } from "@/app/api/reservations/action";

interface ModalReservationProps {
  activityId: string;
  activityName: string;
  price: number;
}

export function ModalReservation({
  activityId,
  activityName,
  price,
}: ModalReservationProps) {
  const [date, setDate] = useState<Date>();
  const [participants, setParticipants] = useState("2");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    setIsLoading(true);
    try {
      await createReservation({
        activityId,
        date,
        participants: parseInt(participants),
        totalPrice: price * parseInt(participants),
      });
      setOpen(false);
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-sky-600 hover:bg-sky-500">
          Réserver maintenant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Réserver {activityName}</DialogTitle>
          <DialogDescription>
            Complétez les informations ci-dessous pour réserver votre activité.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !date && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date
                      ? format(date, "PPP", { locale: fr })
                      : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="participants">Nombre de participants</Label>
              <Select value={participants} onValueChange={setParticipants}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le nombre" />
                </SelectTrigger>
                <SelectContent>
                  {[2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} participants
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Prix total</Label>
              <div className="text-2xl font-bold">
                {price * parseInt(participants)} €
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!date || isLoading}>
              {isLoading
                ? "Réservation en cours..."
                : "Confirmer la réservation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
