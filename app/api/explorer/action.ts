"use server";

import { prisma } from "@/lib/prisma";

export async function getActivities(difficulty?: string) {
  return await prisma.activity.findMany({
    where: difficulty ? { difficulty } : {},
  });
}

export async function getActivityBySlug(slug: string) {
  return await prisma.activity.findUnique({
    where: {
      id: slug,
    },
  });
}
