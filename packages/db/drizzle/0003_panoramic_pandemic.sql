ALTER TABLE "activities" ALTER COLUMN "elevation_gain" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "elevation_loss" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "activities" ADD COLUMN "start_time" timestamp;--> statement-breakpoint
ALTER TABLE "activities" ADD COLUMN "end_time" timestamp;--> statement-breakpoint
ALTER TABLE "activities" DROP COLUMN "avg_speed_mps";--> statement-breakpoint
ALTER TABLE "activities" DROP COLUMN "date";--> statement-breakpoint
ALTER TABLE "activities" DROP COLUMN "time";