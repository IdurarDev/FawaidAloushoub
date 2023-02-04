/*
  Warnings:

  - You are about to drop the column `email` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Plante` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `ResetPassword` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `ResetPassword` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `body` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body` to the `Plante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blogId` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `ResetPassword` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Plante" DROP CONSTRAINT "Plante_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_customerId_fkey";

-- DropForeignKey
ALTER TABLE "ResetPassword" DROP CONSTRAINT "ResetPassword_customerId_fkey";

-- DropIndex
DROP INDEX "Customer_email_key";

-- DropIndex
DROP INDEX "Profile_customerId_key";

-- DropIndex
DROP INDEX "ResetPassword_customerId_key";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "body" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "Plante" DROP COLUMN "description",
ADD COLUMN     "body" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "customerId",
ADD COLUMN     "blogId" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "ResetPassword" DROP COLUMN "customerId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPassword_profileId_key" ON "ResetPassword"("profileId");

-- AddForeignKey
ALTER TABLE "Plante" ADD CONSTRAINT "Plante_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResetPassword" ADD CONSTRAINT "ResetPassword_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
