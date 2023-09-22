/*
  Warnings:

  - You are about to drop the `test_test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "test_test";

-- CreateTable
CREATE TABLE "hola.test_test" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hola.test_test_pkey" PRIMARY KEY ("id")
);
