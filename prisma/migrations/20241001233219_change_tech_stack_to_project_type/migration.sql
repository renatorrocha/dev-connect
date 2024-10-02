/*
  Warnings:

  - You are about to drop the column `techStack` on the `Project` table. All the data in the column will be lost.
  - Added the required column `projectType` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('FRONTEND', 'BACKEND', 'FULLSTACK');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "techStack",
ADD COLUMN     "projectType" "ProjectType" NOT NULL;

-- DropEnum
DROP TYPE "TechStack";
