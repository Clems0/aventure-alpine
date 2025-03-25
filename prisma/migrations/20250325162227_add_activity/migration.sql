/*
  Warnings:

  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_userId_fkey";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "altitude" INTEGER,
ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "price" INTEGER,
ADD COLUMN     "typeActivity" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "summits" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalTime" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "UserProfile";

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "participants" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
