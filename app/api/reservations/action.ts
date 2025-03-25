"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface CreateReservationData {
  activityId: string;
  date: Date;
  participants: number;
  totalPrice: number;
}

// Créer une réservation

export async function createReservation(data: CreateReservationData) {
  const session = await auth();
  console.log("Session:", session); // Ajoute cette ligne pour voir la session

  if (!session?.user?.id) {
    throw new Error("You must be logged in to make a reservation");
  }

  const existingReservation = await prisma.reservation.findFirst({
    where: {
      activityId: data.activityId,
      date: data.date,
    },
  });

  if (existingReservation) {
    throw new Error("This date is already reserved");
  }

  return await prisma.reservation.create({
    data: {
      ...data,
      userId: session.user.id,
      status: "pending",
    },
  });
}

// Récuperer les réservations d'un utilisateur

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

// Supprimer une réservation

export async function deleteReservation(reservationId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Veuillez vous connecter pour accéder à vos réservations");
  }

  try {
    const reservations = await prisma.reservation.delete({
      where: { id: reservationId, userId: session.user.id },
    });

    return reservations;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw new Error("Failed to fetch reservations");
  }
}

export async function updateReservation(
  reservationId: string,
  updateData: any
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Veuillez vous connecter pour accéder à vos réservations");
  }

  try {
    const reservations = await prisma.reservation.update({
      where: { id: reservationId, userId: session.user.id },
      data: updateData,
    });

    return reservations;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw new Error("Failed to fetch reservations");
  }
}
