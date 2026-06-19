-- AlterTable
ALTER TABLE "Enquiry" ADD COLUMN     "subject" TEXT,
ALTER COLUMN "service" SET NOT NULL,
ALTER COLUMN "service" SET DEFAULT 'General Enquiry';
