/*
  Warnings:

  - You are about to drop the column `is_adopted` on the `pets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "is_adopted";

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");
