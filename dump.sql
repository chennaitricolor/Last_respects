-- DROP SCHEMA last_respects_dev;

CREATE SCHEMA last_respects_dev AUTHORIZATION rpt_isolation_dev_rw;

-- DROP SEQUENCE last_respects_dev.burial_sites_id_seq;

CREATE SEQUENCE last_respects_dev.burial_sites_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE last_respects_dev.inventory_id_seq;

CREATE SEQUENCE last_respects_dev.inventory_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE last_respects_dev.machinery_downtime_audit_id_seq;

CREATE SEQUENCE last_respects_dev.machinery_downtime_audit_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE last_respects_dev.slot_meta_id_seq;

CREATE SEQUENCE last_respects_dev.slot_meta_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE last_respects_dev.slots_id_seq;

CREATE SEQUENCE last_respects_dev.slots_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE last_respects_dev.user_id_seq;

CREATE SEQUENCE last_respects_dev.user_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;-- last_respects_dev."user" definition

-- Drop table

-- DROP TABLE last_respects_dev."user";

CREATE TABLE last_respects_dev."user" (
	"name" varchar NOT NULL,
	"password" varchar(1000) NOT NULL,
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	is_admin bool NOT NULL DEFAULT false,
	CONSTRAINT user_pkey PRIMARY KEY (id)
);


-- last_respects_dev.burial_sites definition

-- Drop table

-- DROP TABLE last_respects_dev.burial_sites;

CREATE TABLE last_respects_dev.burial_sites (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	lat float8 NOT NULL,
	long float8 NOT NULL,
	status varchar(40) NOT NULL,
	city varchar(300) NOT NULL,
	address varchar(1000) NOT NULL,
	zone_or_division varchar(200) NOT NULL,
	site_name varchar(200) NOT NULL,
	contact_no int8 NOT NULL,
	admin_type varchar(200) NOT NULL,
	site_type varchar(200) NOT NULL,
	zone_or_division_id varchar(200) NOT NULL,
	"owner" int8 NOT NULL,
	division varchar(200) NULL,
	CONSTRAINT burial_sites_pkey PRIMARY KEY (id),
	CONSTRAINT burial_sites_fk FOREIGN KEY ("owner") REFERENCES last_respects_dev."user"(id)
);


-- last_respects_dev.inventory definition

-- Drop table

-- DROP TABLE last_respects_dev.inventory;

CREATE TABLE last_respects_dev.inventory (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	burial_site_id int8 NOT NULL,
	item varchar(40) NOT NULL,
	status varchar(40) NOT NULL,
	CONSTRAINT inventory_pkey PRIMARY KEY (id),
	CONSTRAINT burial_status_id FOREIGN KEY (burial_site_id) REFERENCES last_respects_dev.burial_sites(id)
);


-- last_respects_dev.machinery_downtime_audit definition

-- Drop table

-- DROP TABLE last_respects_dev.machinery_downtime_audit;

CREATE TABLE last_respects_dev.machinery_downtime_audit (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	burial_site_id int8 NOT NULL,
	status varchar(200) NOT NULL,
	status_end_time timestamp NULL,
	status_start_time timestamp NULL,
	CONSTRAINT machinery_downtime_audit_pk PRIMARY KEY (id),
	CONSTRAINT machinery_downtime_audit_fk FOREIGN KEY (burial_site_id) REFERENCES last_respects_dev.burial_sites(id)
);


-- last_respects_dev.slot_meta definition

-- Drop table

-- DROP TABLE last_respects_dev.slot_meta;

CREATE TABLE last_respects_dev.slot_meta (
	burial_site_id int8 NOT NULL,
	slot varchar NOT NULL,
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	created_date date NULL,
	valid_from date NULL,
	valid_till date NULL,
	updated_date date NULL,
	created_by varchar NULL,
	updated_by varchar NULL,
	slot_order int8 NOT NULL,
	CONSTRAINT slot_meta_pkey PRIMARY KEY (id),
	CONSTRAINT burial_site_id FOREIGN KEY (burial_site_id) REFERENCES last_respects_dev.burial_sites(id)
);


-- last_respects_dev.slots definition

-- Drop table

-- DROP TABLE last_respects_dev.slots;

CREATE TABLE last_respects_dev.slots (
	burial_site_id int8 NOT NULL,
	status varchar(100) NOT NULL,
	covid_related bool NOT NULL,
	attender_name varchar(200) NOT NULL,
	attender_contact varchar(100) NOT NULL,
	reason_for_cancellation varchar(1000) NULL,
	date_of_cremation date NOT NULL,
	deceased_name varchar(100) NOT NULL,
	created_by int8 NOT NULL,
	updated_by int8 NOT NULL,
	death_cert_no varchar(200) NOT NULL,
	proof_type text NULL,
	proof_id varchar(200) NULL,
	created_time timestamp NULL,
	updated_time timestamp NULL,
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	slot varchar(200) NULL,
	actual_arrived_time timestamp(0) NULL,
	actual_start_time timestamp(0) NULL,
	actual_completed_time timestamp(0) NULL,
	attender_type varchar(200) NULL,
	attender_address varchar(1200) NULL,
	aadhar_of_deceased varchar NULL,
	booking_id varchar NOT NULL,
	CONSTRAINT slots_pkey PRIMARY KEY (id),
	CONSTRAINT burial_site_id FOREIGN KEY (burial_site_id) REFERENCES last_respects_dev.burial_sites(id),
	CONSTRAINT created_by FOREIGN KEY (created_by) REFERENCES last_respects_dev."user"(id),
	CONSTRAINT updated_by FOREIGN KEY (updated_by) REFERENCES last_respects_dev."user"(id)
);
