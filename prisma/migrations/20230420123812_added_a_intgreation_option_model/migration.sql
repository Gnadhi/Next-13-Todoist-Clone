/*
  Warnings:

  - The values [MANAGER,EMPLOYEE] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `frameworkId` on the `controls` table. All the data in the column will be lost.
  - You are about to drop the column `integrationId` on the `evidence` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `integrations` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `integrations` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `integrations` table. All the data in the column will be lost.
  - You are about to drop the column `frameworkId` on the `policies` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `users` table. All the data in the column will be lost.
  - Added the required column `selectedIngrationId` to the `integrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('manager', 'employee');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'manager';
COMMIT;

-- DropForeignKey
ALTER TABLE "controls" DROP CONSTRAINT "controls_frameworkId_fkey";

-- DropForeignKey
ALTER TABLE "evidence" DROP CONSTRAINT "evidence_integrationId_fkey";

-- DropForeignKey
ALTER TABLE "policies" DROP CONSTRAINT "policies_frameworkId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_companyId_fkey";

-- AlterTable
ALTER TABLE "controls" DROP COLUMN "frameworkId",
ADD COLUMN     "framework_id" TEXT;

-- AlterTable
ALTER TABLE "evidence" DROP COLUMN "integrationId",
ADD COLUMN     "integration_id" TEXT;

-- AlterTable
ALTER TABLE "integrations" DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "url",
ADD COLUMN     "selectedIngrationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "policies" DROP COLUMN "frameworkId",
ADD COLUMN     "framework_id" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "companyId",
DROP COLUMN "imageUrl",
ADD COLUMN     "company_id" TEXT NOT NULL DEFAULT '1',
ADD COLUMN     "img_url" TEXT,
ALTER COLUMN "role" SET DEFAULT 'manager';

-- CreateTable
CREATE TABLE "integration_option" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,

    CONSTRAINT "integration_option_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controls" ADD CONSTRAINT "controls_framework_id_fkey" FOREIGN KEY ("framework_id") REFERENCES "frameworks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policies" ADD CONSTRAINT "policies_framework_id_fkey" FOREIGN KEY ("framework_id") REFERENCES "frameworks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_integration_id_fkey" FOREIGN KEY ("integration_id") REFERENCES "integrations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_selectedIngrationId_fkey" FOREIGN KEY ("selectedIngrationId") REFERENCES "integration_option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
