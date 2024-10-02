-- CreateEnum
CREATE TYPE "MACHINE_TYPE" AS ENUM ('Row', 'WallBalls', 'SledPush', 'SledPull', 'SkiErg', 'TreadMill', 'TrainingOutside', 'Bike', 'AssBike', 'CrossTrainer', 'StairMaster', 'JumpRope');

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "machineType" "MACHINE_TYPE";
