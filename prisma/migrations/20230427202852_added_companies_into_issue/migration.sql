/*
  Warnings:

  - Added the required column `companyId` to the `issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "issue" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "issue" ADD CONSTRAINT "issue_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
