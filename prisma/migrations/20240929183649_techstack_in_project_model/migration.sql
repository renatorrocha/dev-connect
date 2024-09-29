/*
  Warnings:

  - Added the required column `techStack` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TechStack" AS ENUM ('FRONTEND', 'BACKEND', 'FULLSTACK');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "techStack" "TechStack" NOT NULL;
