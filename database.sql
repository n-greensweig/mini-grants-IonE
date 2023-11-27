
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR (120) UNIQUE NOT NULL,
	"full_name" VARCHAR(240),
	"google_id" VARCHAR(120),
    "admin" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "grant_data" (
	"id" SERIAL PRIMARY KEY,
	"cycle_id" INT REFERENCES "grant_cycle",
	"dept_id" VARCHAR[],
	"reviewed" BOOLEAN DEFAULT 0,
	"google_sheet" VARCHAR(1000)
)

CREATE TABLE "grant_cycle" (
	"id" SERIAL PRIMARY KEY,
	"start_date" DATE,
	"end_date" DATE,
	"grant_type" VARCHAR(60),
	"complete" BOOLEAN DEFAULT 0
)

CREATE TABLE "scores" (
    "id" SERIAL PRIMARY KEY,
	"created_at" DATE,
	"grant_id" INT REFERENCES "grant_data",
	"reviewer_id" INT REFERENCES "user",
	"assigned_by" INT REFERENCES "user",
	new_field integer
	score_2 integer
	score_3 integer
)

CREATE TABLE "departments" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(200)
)

CREATE TABLE "grant_assignments" (
    "id" SERIAL PRIMARY KEY,
	"assigned_at" DATE,
	"assigned_by" INT REFERENCES "user",
	"grant_id" INT REFERENCES "grant_data",
	"reviewer_id" INT REFERENCES "user",
	"cycle_id" INT REFERENCES "grant_cycle",
)

CREATE TABLE "reviewers" (
    "id" SERIAL PRIMARY KEY,
	"reviewer_id" INT REFERENCES "user",
	"cycle_id" INT REFERENCES "grant_cycle",
	"available_reviews" INT,
	"dept_id" VARCHAR[],
)