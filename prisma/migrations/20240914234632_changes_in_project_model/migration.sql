/*
  Warnings:

  - You are about to drop the column `links` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Project` table. All the data in the column will be lost.
  - Added the required column `readme` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repositoryLink` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "links",
DROP COLUMN "tags",
ADD COLUMN     "readme" TEXT NOT NULL,
ADD COLUMN     "repositoryLink" TEXT NOT NULL;
