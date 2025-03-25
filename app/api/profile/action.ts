"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getUserProfile() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Veuillez vous connecter pour accéder à votre profile");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id || "",
      },
      include: {
        adventures: false,
        //photos: true,
        companions: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                city: true,
                country: true,
              },
            },
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw new Error("Failed to fetch reservations");
  }
}

export async function updateUserProfile() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Veuillez vous connecter pour accéder à votre profile");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id || "",
      },
      include: {
        adventures: false,
        //photos: true,
        companions: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                city: true,
                country: true,
              },
            },
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw new Error("Failed to fetch reservations");
  }
}
