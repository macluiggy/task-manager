/*
  Warnings:

  - You are about to drop the `test2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "test2";

-- CreateTable
CREATE TABLE "test_test" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "test_test_pkey" PRIMARY KEY ("id")
);
