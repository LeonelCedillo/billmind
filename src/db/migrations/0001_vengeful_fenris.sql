ALTER TABLE "bills" ALTER COLUMN "due_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "bills" ADD COLUMN "due_day_of_month" integer;--> statement-breakpoint
ALTER TABLE "bills" ADD COLUMN "due_month" integer;--> statement-breakpoint
ALTER TABLE "bills" ADD CONSTRAINT "due_day_of_month" CHECK ("bills"."due_day_of_month" IS NULL OR ("bills"."due_day_of_month" >= 1 AND "bills"."due_day_of_month" <= 31));--> statement-breakpoint
ALTER TABLE "bills" ADD CONSTRAINT "due_month" CHECK ("bills"."due_month" IS NULL OR ("bills"."due_month" >= 1 AND "bills"."due_month" <= 12));