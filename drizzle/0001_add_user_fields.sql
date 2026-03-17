-- Add new columns to users table
ALTER TABLE "users" ADD COLUMN "clerkUserId" varchar(255);
ALTER TABLE "users" ADD COLUMN "subscription" varchar(50) DEFAULT 'free';

-- Add unique constraint for clerkUserId
ALTER TABLE "users" ADD CONSTRAINT "users_clerkUserId_unique" UNIQUE("clerkUserId");

-- Update existing users with a temporary clerkUserId (this will need to be updated when they log in)
UPDATE "users" SET "clerkUserId" = CONCAT('temp_', id::text) WHERE "clerkUserId" IS NULL;
