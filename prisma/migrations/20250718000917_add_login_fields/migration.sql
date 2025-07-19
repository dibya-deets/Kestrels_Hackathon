/*
  Warnings:

  - Made the column `lastLogin` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'Seedling',
ADD COLUMN     "xp" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "lastLogin" SET NOT NULL;
