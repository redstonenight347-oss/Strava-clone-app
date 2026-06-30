ALTER TABLE "activities" ADD COLUMN "elevation" integer;--> statement-breakpoint
ALTER TABLE "activities" ADD COLUMN "date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "activities" ADD COLUMN "time" time NOT NULL;