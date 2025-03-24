"use server";

import { prisma } from "@/lib/prisma";

export async function getActivities(difficulty?: string) {
  // Probablement 'Activity' au lieu de 'User'
  return await prisma.activity.findMany({
    where: difficulty ? { difficulty } : {},
  });
}
