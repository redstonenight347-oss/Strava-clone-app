CREATE TYPE "public"."pace_unit" AS ENUM('min/km', 'min/mi');--> statement-breakpoint
CREATE TYPE "public"."speed_unit" AS ENUM('km/h', 'mph', 'm/s');--> statement-breakpoint
ALTER TABLE "user_preferences" ADD COLUMN "pace_unit" "pace_unit" DEFAULT 'min/km' NOT NULL;--> statement-breakpoint
ALTER TABLE "user_preferences" ADD COLUMN "speed_unit" "speed_unit" DEFAULT 'km/h' NOT NULL;