CREATE DATABASE "IonE_Grants"

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR (120) UNIQUE NOT NULL,
  "full_name" VARCHAR(240),
  "google_id" VARCHAR(120),
  "admin" BOOLEAN DEFAULT FALSE,
  "avatarPic" VARCHAR(220)
);


CREATE TABLE "grant_data" (
	"id" SERIAL PRIMARY KEY,
	"time_stamp" DATE,
	"cycle_id" INT REFERENCES "grant_cycle",
	"dept_id" VARCHAR[],
	"applicant_name" VARCHAR(120),
	"applicant_email" VARCHAR(60),
	"abstract" VARCHAR(2000),
	"proposal_narrative" VARCHAR(15000),
	"project_title" VARCHAR(500),
	"principal_investigator" VARCHAR(100),
	"letter_of_support" VARCHAR(120), --letter of support will contain a URL
	"PI_email" VARCHAR(60),
	"PI_employee_id" VARCHAR(200), -- This line should be salted
	"PI_dept_id" VARCHAR(60),
	"PI_primary_college" VARCHAR(100),
	"PI_primary_campus" VARCHAR(100),
	"PI_dept_accountant_name" VARCHAR(60),
	"PI_dept_accountant_email" VARCHAR(60),
	"additional_team_members" JSONB,
	"funding_type" VARCHAR(120),
	"UMN_campus_or_center" VARCHAR(120),
	"period_of_performance" VARCHAR(60),
	"budget_items" VARCHAR(120), --contains URL
	"new_endeavor" BOOLEAN,
	"heard_from_reference" VARCHAR(100),
	"total_requested_budget" INT
);


CREATE TABLE "grant_cycle" (
	"id" SERIAL PRIMARY KEY,
	"start_date" DATE,
	"end_date" DATE,
	"grant_type" VARCHAR(60),
	"cycle_complete" BOOLEAN DEFAULT FALSE,
	"cycle_name" VARCHAR(30)
);


CREATE TABLE "scores" (
    "id" SERIAL PRIMARY KEY,
	"created_at" DATE,
	"grant_id" INT REFERENCES "grant_data",
	"reviewer_id" INT REFERENCES "user",
	"interdisciplinary" INT,
	"goals" INT,
	"method_and_design" INT,
	"budget" NUMERIC(1, 1),
	"impact" INT,
	"comments" VARCHAR (2000), 
	"review_complete" BOOLEAN DEFAULT FALSE,
	"total_score" NUMERIC(2, 1),
	"principal_investigator" VARCHAR(100),
	"project_title" VARCHAR(500)
);



CREATE TABLE "departments" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(200)
);


CREATE TABLE "grant_assignments" (
    "id" SERIAL PRIMARY KEY,
	"assigned_at" DATE,
	"assigned_by" INT REFERENCES "user",
	"grant_id" INT REFERENCES "grant_data",
	"reviewer_id" INT REFERENCES "user",
	"cycle_id" INT REFERENCES "grant_cycle"
);


CREATE TABLE "reviewers" (
    "id" SERIAL PRIMARY KEY,
	"reviewer_id" INT REFERENCES "user",
	"cycle_id" INT REFERENCES "grant_cycle",
	"available_reviews" INT,
	"name" VARCHAR (250),
	"dept_id" VARCHAR[]
);


--Function must be inserted into database in order for google sheet import
CREATE OR REPLACE FUNCTION checkDuplicateEntry(
    IN p_project_title VARCHAR(500),
	IN p_cycle_id INTEGER
)
RETURNS BOOLEAN AS
$$
DECLARE
    v_count INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO v_count
    FROM grant_data
    WHERE project_title = p_project_title
	  AND cycle_id = p_cycle_id;

    IF v_count > 0 THEN
        -- Entry with the same project_title, applicant_name, and applicant_email exists
        RETURN TRUE;
    ELSE
        -- No matching entry found, proceed with insertion
        RETURN FALSE;
    END IF;
END;
$$
LANGUAGE 'plpgsql';

--If the function needs to be updated this query will list the current functions and provide a 
--psql line to drop them as needed
SELECT 'DROP FUNCTION IF EXISTS ' || ns.nspname || '.' || proname || '(' || oidvectortypes(proargtypes) || ');'
FROM pg_proc
JOIN pg_namespace ns ON (pg_proc.pronamespace = ns.oid)
WHERE ns.nspname NOT LIKE 'pg_%' AND ns.nspname != 'information_schema';