
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR (120) UNIQUE NOT NULL,
    "admin" BOOLEAN DEFAULT 0
);

CREATE TABLE "grant_data" (
	"id" SERIAL PRIMARY KEY,
	"cycle_id" INT REFERENCES "grant_cycle",
	"dept_id" VARCHAR[],
	"reviewed" BOOLEAN DEFAULT 0,
	"applicant_name" VARCHAR(60),
	"applicant_email" VARCHAR(60),
	"abstract" VARCHAR(10000),
	"proposal_narrative" TEXT,
	"project_title" VARCHAR(500),
	"principal_investigator" VARCHAR(100),
	--letter of support will contain a URL
	"letter_of_support" VARCHAR(120), 
	"PI_email" VARCHAR(60),
	--Below data should be salted
	"PI_employee_id" INT,
	"PI_primary_college" VARCHAR(100),
	"PI_primary_campus" VARCHAR(100),
	"PI_dept_accountant_name" VARCHAR(60),
	"PI_dept_accountant_email" VARCHAR(60),
	--Column O place holder(name)
	--Column P place holder(email)
	--Column Q place holder
	--Column R place holder
	"additional_team_members" JSONB,
	"funding_type" VARCHAR(120),
	"UMN_campus_or_center" VARCHAR(120),
	"period_of_performance" VARCHAR(120),
	"budget_items" VARCHAR[],
	"new_endeavor" BOOLEAN,
	"heard_from_referece" VARCHAR(100),
	"total_requested_budget" INT
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