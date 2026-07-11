CREATE TABLE "activity_streams" (
	"id" serial PRIMARY KEY NOT NULL,
	"activity_id" integer NOT NULL,
	"time_data" jsonb NOT NULL,
	"distance_data" jsonb NOT NULL,
	"altitude_data" jsonb NOT NULL,
	"speed_data" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "activities" RENAME COLUMN "elevation" TO "elevation_gain";--> statement-breakpoint
ALTER TABLE "activities" ADD COLUMN "encoded_polyline" text;--> statement-breakpoint
ALTER TABLE "activities" ADD COLUMN "avg_speed_mps" real;--> statement-breakpoint
ALTER TABLE "activities" ADD COLUMN "max_speed_mps" real;--> statement-breakpoint
ALTER TABLE "activities" ADD COLUMN "elevation_loss" integer;--> statement-breakpoint
ALTER TABLE "activity_streams" ADD CONSTRAINT "activity_streams_activity_id_activities_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("activity_id") ON DELETE cascade ON UPDATE no action;