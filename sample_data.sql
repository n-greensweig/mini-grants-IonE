
INSERT INTO "user" ("email", "full_name", "google_id", "admin")
VALUES ("test@umn.edu", "John-Gopher", "TEST", FALSE),
("hi@umn.edu", "Jane-Gopher", "TEST", FALSE),
("admin@umn.edu", "Admin-Gopher", "TEST", TRUE)

CREATE TABLE "grant_data" (
	"id" SERIAL PRIMARY KEY,
	"time_stamp" DATE,
	"cycle_id" INT REFERENCES "grant_cycle",
	"dept_id" VARCHAR[],
	"applicant_name" VARCHAR(60),
	"applicant_email" VARCHAR(60),
	"abstract" VARCHAR(2000),
	"proposal_narrative" VARCHAR(15000),
	"project_title" VARCHAR(500),
	"principal_investigator" VARCHAR(100),
	--letter of support will contain a URL
	"letter_of_support" VARCHAR(120), 
	"PI_email" VARCHAR(60),
	--Below line should be salted
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
	"period_of_performance" INT,
	"budget_items" VARCHAR(7500),
	"new_endeavor" BOOLEAN,
	"heard_from_referece" VARCHAR(100),
	"total_requested_budget" INT
);


INSERT INTO "grant_cycle" ("start_date", "end_date", "grant_type", "cycle_name", "cycle_complete")
VALUES ()


INSERT INTO "scores" ("created_at", "grant_id", "reviewer_id", "assigned_by", "interdisciplinary", "goals", "method_and_design", "budget", "impact", "review_complete")
VALUES ()


INSERT INTO "departments" ("name")
VALUES ("Math"), ("Physics"), ("Public-Health")


INSERT INTO "grant_assignments" ("assigned_at", "assigned_by", "grant_id", "reviewer_id", "cycle_id")
VALUES ()


INSERT INTO "reviewers" ("reviewer_id", "cycle_id", "available_reviews", "dept_id")
VALUES()