/*
  Warnings:

  - You are about to drop the column `activated_at` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "activated_at",
ADD COLUMN     "activatedAt" TIMESTAMP(3);
