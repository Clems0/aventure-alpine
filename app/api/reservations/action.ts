"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface CreateReservationData {
  activityId: string;
  date: Date;
  participants: number;
  totalPrice: number;
}

export async function createReservation(data: CreateReservationData) {
  const session = await auth();
  console.log("Session:", session); // Ajoute cette ligne pour voir la session

  if (!session?.user?.id) {
    throw new Error("You must be logged in to make a reservation");
  }

  return await prisma.reservation.create({
    data: {
      ...data,
      userId: session.user.id,
      status: "pending",
    },
  });
}

export async function getUserReservations() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Veuillez vous connecter pour accéder à vos réservations");
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: { userId: session.user.id },
      include: {
        activity: true, // Si tu veux récupérer les infos du voyage associé
      },
      orderBy: { date: "asc" },
    });

    return reservations;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw new Error("Failed to fetch reservations");
  }
}
