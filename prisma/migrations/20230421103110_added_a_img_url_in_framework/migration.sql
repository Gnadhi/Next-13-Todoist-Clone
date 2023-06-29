/*
  Warnings:

  - You are about to drop the column `framework_id` on the `controls` table. All the data in the column will be lost.
  - Added the required column `img_url` to the `frameworks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "controls" DROP CONSTRAINT "controls_framework_id_fkey";

-- AlterTable
ALTER TABLE "controls" DROP COLUMN "framework_id";

-- AlterTable
ALTER TABLE "frameworks" ADD COLUMN     "img_url" TEXT NOT NULL;
