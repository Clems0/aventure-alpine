"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getUserProfile() {
  const session = await auth();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",
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
}

export async function updateUserProfile() {
  const session = await auth();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",
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
}
