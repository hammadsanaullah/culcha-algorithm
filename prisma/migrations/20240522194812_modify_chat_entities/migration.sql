/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Chat` table. All the data in the column will be lost.
  - Made the column `groupId` on table `Chat` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `type` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GROUP_TYPE" AS ENUM ('Group', 'DirectMessage');

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_receiverId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "receiverId",
ALTER COLUMN "groupId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "type" "GROUP_TYPE" NOT NULL;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
