-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "appointment_date" TIMESTAMP(3) NOT NULL,
    "vaccinated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);
