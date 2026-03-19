/*
  Warnings:

  - The `theme` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "theme",
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'dark';

-- DropEnum
DROP TYPE "Theme";
