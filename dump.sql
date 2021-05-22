--
-- PostgreSQL database dump
--

-- Dumped from database version 10.16 (Ubuntu 10.16-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 12.1 (Ubuntu 12.1-1.pgdg16.04+1)

-- Started on 2021-05-22 23:51:38 IST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3002 (class 1262 OID 20269)
-- Name: last_respects; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE last_respects WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE last_respects OWNER TO admin;

\connect last_respects

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 20271)
-- Name: last_respects_dev; Type: SCHEMA; Schema: -; Owner: rpt_isolation_dev_rw
--

CREATE SCHEMA last_respects_dev;


ALTER SCHEMA last_respects_dev OWNER TO rpt_isolation_dev_rw;

SET default_tablespace = '';

--
-- TOC entry 210 (class 1259 OID 20388)
-- Name: burial_sites; Type: TABLE; Schema: last_respects_dev; Owner: postgres
--

CREATE TABLE last_respects_dev.burial_sites (
    id bigint NOT NULL,
    lat double precision NOT NULL,
    long double precision NOT NULL,
    status character varying(40) NOT NULL,
    city character varying(300) NOT NULL,
    address character varying(1000) NOT NULL,
    zone_or_division character varying(200) NOT NULL,
    site_name character varying(200) NOT NULL,
    contact_no bigint NOT NULL,
    admin_type character varying(200) NOT NULL,
    site_type character varying(200) NOT NULL,
    zone_or_division_id character varying(200) NOT NULL,
    owner bigint NOT NULL
);


ALTER TABLE last_respects_dev.burial_sites OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 20394)
-- Name: burial_sites_id_seq; Type: SEQUENCE; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE last_respects_dev.burial_sites ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME last_respects_dev.burial_sites_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 212 (class 1259 OID 20396)
-- Name: inventory; Type: TABLE; Schema: last_respects_dev; Owner: postgres
--

CREATE TABLE last_respects_dev.inventory (
    id bigint NOT NULL,
    burial_site_id bigint NOT NULL,
    item character varying(40) NOT NULL,
    status character varying(40) NOT NULL
);


ALTER TABLE last_respects_dev.inventory OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 20399)
-- Name: inventory_id_seq; Type: SEQUENCE; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE last_respects_dev.inventory ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME last_respects_dev.inventory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 227 (class 1259 OID 20585)
-- Name: machinery_downtime_audit; Type: TABLE; Schema: last_respects_dev; Owner: postgres
--

CREATE TABLE last_respects_dev.machinery_downtime_audit (
    id bigint NOT NULL,
    burial_site_id bigint NOT NULL,
    status character varying(200) NOT NULL,
    status_end_time timestamp without time zone,
    status_start_time timestamp without time zone
);


ALTER TABLE last_respects_dev.machinery_downtime_audit OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 20597)
-- Name: machinery_downtime_audit_id_seq; Type: SEQUENCE; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE last_respects_dev.machinery_downtime_audit ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME last_respects_dev.machinery_downtime_audit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 214 (class 1259 OID 20401)
-- Name: slot_meta; Type: TABLE; Schema: last_respects_dev; Owner: postgres
--

CREATE TABLE last_respects_dev.slot_meta (
    burial_site_id bigint NOT NULL,
    slot character varying NOT NULL,
    id bigint NOT NULL,
    created_date date,
    valid_from date,
    valid_till date,
    updated_date date,
    slot_order int8 NOT NULL
    created_by character varying,
    updated_by character varying
);


ALTER TABLE last_respects_dev.slot_meta OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 20407)
-- Name: slot_meta_id_seq; Type: SEQUENCE; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE last_respects_dev.slot_meta ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME last_respects_dev.slot_meta_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 20409)
-- Name: slots; Type: TABLE; Schema: last_respects_dev; Owner: postgres
--

CREATE TABLE last_respects_dev.slots (
    burial_site_id bigint NOT NULL,
    status character varying(100) NOT NULL,
    covid_related boolean NOT NULL,
    attender_name character varying(200) NOT NULL,
    attender_contact character varying(100) NOT NULL,
    reason_for_cancellation character varying(1000),
    date_of_cremation date NOT NULL,
    deceased_name character varying(100) NOT NULL,
    created_by bigint NOT NULL,
    updated_by bigint NOT NULL,
    death_cert_no character varying(200) NOT NULL,
    proof_type text,
    proof_id character varying(200),
    created_time timestamp without time zone,
    updated_time timestamp without time zone,
    id bigint NOT NULL,
    slot character varying(200),
    actual_arrived_time timestamp(0) without time zone,
    actual_start_time timestamp(0) without time zone,
    actual_completed_time timestamp(0) without time zone
);


ALTER TABLE last_respects_dev.slots OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 20415)
-- Name: slots_id_seq; Type: SEQUENCE; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE last_respects_dev.slots ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME last_respects_dev.slots_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 20417)
-- Name: user; Type: TABLE; Schema: last_respects_dev; Owner: postgres
--

CREATE TABLE last_respects_dev."user" (
    name character varying NOT NULL,
    password character varying(1000) NOT NULL,
    id bigint NOT NULL
);


ALTER TABLE last_respects_dev."user" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 20423)
-- Name: user_id_seq; Type: SEQUENCE; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE last_respects_dev."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME last_respects_dev.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 2985 (class 0 OID 20388)
-- Dependencies: 210
-- Data for Name: burial_sites; Type: TABLE DATA; Schema: last_respects_dev; Owner: postgres
--

INSERT INTO last_respects_dev.burial_sites OVERRIDING SYSTEM VALUE VALUES (23, 12.3309999999999995, 12.3460000000000001, 'AVAILABLE', 'chennai', 'test address', 'Kasimedu', 'site1', 8015350044, 'staff', 'lpg', 'GCC_KSM', 3);
INSERT INTO last_respects_dev.burial_sites OVERRIDING SYSTEM VALUE VALUES (25, 12.3339999999999996, 12.3480000000000008, 'AVAILABLE', 'chennai', 'test address', 'Adambakkam', 'site1', 8015350044, 'staff', 'lpg', 'GCC_ADM', 5);
INSERT INTO last_respects_dev.burial_sites OVERRIDING SYSTEM VALUE VALUES (24, 12.3320000000000007, 12.3469999999999995, 'UNAVAILABLE', 'chennai', 'test address', 'Nanaganallur', 'site1', 8015350044, 'staff', 'lpg', 'GCC_NGL', 4);
INSERT INTO last_respects_dev.burial_sites OVERRIDING SYSTEM VALUE VALUES (19, 12.3330000000000002, 12.3450000000000006, 'AVAILABLE', 'chennai', 'test address', 'Teynampet', 'site1', 8015350044, 'staff', 'lpg', 'GCC_TYM', 7);
INSERT INTO last_respects_dev.burial_sites OVERRIDING SYSTEM VALUE VALUES (20, 12.3330000000000002, 12.3450000000000006, 'AVAILABLE', 'chennai', 'test address', 'Teynampet', 'site2', 8015350044, 'staff', 'lpg', 'GCC_TYM', 2);


--
-- TOC entry 2987 (class 0 OID 20396)
-- Dependencies: 212
-- Data for Name: inventory; Type: TABLE DATA; Schema: last_respects_dev; Owner: postgres
--



--
-- TOC entry 2995 (class 0 OID 20585)
-- Dependencies: 227
-- Data for Name: machinery_downtime_audit; Type: TABLE DATA; Schema: last_respects_dev; Owner: postgres
--

INSERT INTO last_respects_dev.machinery_downtime_audit OVERRIDING SYSTEM VALUE VALUES (1, 20, 'AVAILABLE', '2021-05-22 18:04:33.083', '2021-05-22 23:18:14');
INSERT INTO last_respects_dev.machinery_downtime_audit OVERRIDING SYSTEM VALUE VALUES (2, 20, 'AVAILABLE', '2021-05-22 18:04:33.083', '2021-05-22 17:56:59.97');
INSERT INTO last_respects_dev.machinery_downtime_audit OVERRIDING SYSTEM VALUE VALUES (3, 20, 'AVAILABLE', '2021-05-22 18:04:33.083', '2021-05-22 17:58:48.064');
INSERT INTO last_respects_dev.machinery_downtime_audit OVERRIDING SYSTEM VALUE VALUES (4, 20, 'AVAILABLE', '2021-05-22 18:05:14.632', '2021-05-22 18:04:33.083');
INSERT INTO last_respects_dev.machinery_downtime_audit OVERRIDING SYSTEM VALUE VALUES (5, 20, 'UNAVAILABLE', '2021-05-22 18:05:36.136', '2021-05-22 18:05:14.632');
INSERT INTO last_respects_dev.machinery_downtime_audit OVERRIDING SYSTEM VALUE VALUES (6, 20, 'AVAILABLE', '2021-05-22 18:05:50.947', '2021-05-22 18:05:36.136');
INSERT INTO last_respects_dev.machinery_downtime_audit OVERRIDING SYSTEM VALUE VALUES (7, 20, 'AVAILABLE', NULL, '2021-05-22 18:05:50.947');


--
-- TOC entry 2989 (class 0 OID 20401)
-- Dependencies: 214
-- Data for Name: slot_meta; Type: TABLE DATA; Schema: last_respects_dev; Owner: postgres
--

INSERT INTO last_respects_dev.slot_meta OVERRIDING SYSTEM VALUE VALUES (19, '08:30AM - 09:30 AM', 6, NULL, '2021-05-22', '2021-05-25', NULL, 'Riyaz', 'Riyaz');
INSERT INTO last_respects_dev.slot_meta OVERRIDING SYSTEM VALUE VALUES (19, '08:00 AM - 08:30 AM', 7, NULL, '2021-05-22', '2021-05-25', NULL, 'Riyaz', 'Riyaz');
INSERT INTO last_respects_dev.slot_meta OVERRIDING SYSTEM VALUE VALUES (19, '07:00 AM - 08:00 AM', 5, NULL, '2021-05-21', '2021-05-25', NULL, 'Riyaz', 'Riyaz');
INSERT INTO last_respects_dev.slot_meta OVERRIDING SYSTEM VALUE VALUES (24, '08:00 AM - 08:30 AM', 9, NULL, '2021-05-22', '2021-05-25', NULL, 'Riyaz', 'Riyaz');
INSERT INTO last_respects_dev.slot_meta OVERRIDING SYSTEM VALUE VALUES (23, '08:00 AM - 08:30 AM', 10, NULL, '2021-05-22', '2021-05-25', NULL, 'Riyaz', 'Riyaz');


--
-- TOC entry 2991 (class 0 OID 20409)
-- Dependencies: 216
-- Data for Name: slots; Type: TABLE DATA; Schema: last_respects_dev; Owner: postgres
--

INSERT INTO last_respects_dev.slots OVERRIDING SYSTEM VALUE VALUES (23, 'BOOKED', true, 'yeman', '324234234', NULL, '2021-05-23', 'Jegan', 2, 2, '12312312312312', NULL, NULL, '2021-05-22 12:15:14.23', '2021-05-22 12:15:14.23', 36, '8:00-8:45 AM', NULL, NULL, NULL);
INSERT INTO last_respects_dev.slots OVERRIDING SYSTEM VALUE VALUES (19, 'NOSHOW', true, 'yeman', '324234234', '', '2021-05-22', 'Jegan', 2, 7, '12312312312312', NULL, NULL, '2021-05-22 11:37:46.672', '2021-05-22 18:00:51.394', 33, '08:30AM - 09:30 AM', NULL, NULL, NULL);
INSERT INTO last_respects_dev.slots OVERRIDING SYSTEM VALUE VALUES (19, 'BOOKED', false, 'Test', '8234213212', '', '2021-05-22', 'Testing', 7, 7, '', '', NULL, '2021-05-22 18:05:22.507', '2021-05-22 18:05:22.507', 47, '08:00 AM - 08:30 AM', NULL, NULL, NULL);


--
-- TOC entry 2993 (class 0 OID 20417)
-- Dependencies: 218
-- Data for Name: user; Type: TABLE DATA; Schema: last_respects_dev; Owner: postgres
--

INSERT INTO last_respects_dev."user" OVERRIDING SYSTEM VALUE VALUES ('venky', '$2a$10$0Tzj0paDyXlGu2H2gwoZtubrn80u0BPa0V7QaDk9bNMDxmQ4G2wMe', 2);
INSERT INTO last_respects_dev."user" OVERRIDING SYSTEM VALUE VALUES ('riyaz', '$2a$10$yyQaOFVDLgYU3RC1slkGy.BOzYh0rsuuaxmfPweeswHlhHiH0uLpS', 3);
INSERT INTO last_respects_dev."user" OVERRIDING SYSTEM VALUE VALUES ('riyaz1', '$2a$10$OWF5/p6INB/6IOzDGJz.QOMMLXNqb6TDfQQ7XPBZwIs0kOF1NKWuC', 4);
INSERT INTO last_respects_dev."user" OVERRIDING SYSTEM VALUE VALUES ('riyaz2', '$2a$10$GvWuLWgWvAyPIGpCUH50Xebf/8tOzfEk9TpAVrzVJZhk95l4ucCgm', 5);
INSERT INTO last_respects_dev."user" OVERRIDING SYSTEM VALUE VALUES ('riyaz3', '$2a$10$QMdKzQx4PnvRoYoZ.LsxxuF.PBTKfk.eK2VkZLO/q/5ZK7Bh0GVUq', 6);
INSERT INTO last_respects_dev."user" OVERRIDING SYSTEM VALUE VALUES ('test123', '$2a$10$SGvJU44TPlcUu6O1OJIqYOjuL3otfTAGG6aZNNaIisLJWIZ3p0EDy', 7);
INSERT INTO last_respects_dev."user" OVERRIDING SYSTEM VALUE VALUES ('barani', '$2a$10$t8ML1gr3C2/rBrOBb9cVyO3Cc96E0k7No/TND4Vn5ol6.N6WCFjN6', 8);


--
-- TOC entry 3003 (class 0 OID 0)
-- Dependencies: 211
-- Name: burial_sites_id_seq; Type: SEQUENCE SET; Schema: last_respects_dev; Owner: postgres
--

SELECT pg_catalog.setval('last_respects_dev.burial_sites_id_seq', 25, true);


--
-- TOC entry 3004 (class 0 OID 0)
-- Dependencies: 213
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: last_respects_dev; Owner: postgres
--

SELECT pg_catalog.setval('last_respects_dev.inventory_id_seq', 1, false);


--
-- TOC entry 3005 (class 0 OID 0)
-- Dependencies: 228
-- Name: machinery_downtime_audit_id_seq; Type: SEQUENCE SET; Schema: last_respects_dev; Owner: postgres
--

SELECT pg_catalog.setval('last_respects_dev.machinery_downtime_audit_id_seq', 7, true);


--
-- TOC entry 3006 (class 0 OID 0)
-- Dependencies: 215
-- Name: slot_meta_id_seq; Type: SEQUENCE SET; Schema: last_respects_dev; Owner: postgres
--

SELECT pg_catalog.setval('last_respects_dev.slot_meta_id_seq', 10, true);


--
-- TOC entry 3007 (class 0 OID 0)
-- Dependencies: 217
-- Name: slots_id_seq; Type: SEQUENCE SET; Schema: last_respects_dev; Owner: postgres
--

SELECT pg_catalog.setval('last_respects_dev.slots_id_seq', 47, true);


--
-- TOC entry 3008 (class 0 OID 0)
-- Dependencies: 219
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: last_respects_dev; Owner: postgres
--

SELECT pg_catalog.setval('last_respects_dev.user_id_seq', 8, true);


--
-- TOC entry 2843 (class 2606 OID 20426)
-- Name: burial_sites burial_sites_pkey; Type: CONSTRAINT; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE ONLY last_respects_dev.burial_sites
    ADD CONSTRAINT burial_sites_pkey PRIMARY KEY (id);


--
-- TOC entry 2845 (class 2606 OID 20428)
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE ONLY last_respects_dev.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (id);


--
-- TOC entry 2853 (class 2606 OID 20589)
-- Name: machinery_downtime_audit machinery_downtime_audit_pk; Type: CONSTRAINT; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE ONLY last_respects_dev.machinery_downtime_audit
    ADD CONSTRAINT machinery_downtime_audit_pk PRIMARY KEY (id);


--
-- TOC entry 2847 (class 2606 OID 20430)
-- Name: slot_meta slot_meta_pkey; Type: CONSTRAINT; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE ONLY last_respects_dev.slot_meta
    ADD CONSTRAINT slot_meta_pkey PRIMARY KEY (id);


--
-- TOC entry 2849 (class 2606 OID 20432)
-- Name: slots slots_pkey; Type: CONSTRAINT; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE ONLY last_respects_dev.slots
    ADD CONSTRAINT slots_pkey PRIMARY KEY (id);


--
-- TOC entry 2851 (class 2606 OID 20434)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE ONLY last_respects_dev."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2856 (class 2606 OID 20440)
-- Name: slot_meta burial_site_id; Type: FK CONSTRAINT; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE ONLY last_respects_dev.slot_meta
    ADD CONSTRAINT burial_site_id FOREIGN KEY (burial_site_id) REFERENCES last_respects_dev.burial_sites(id);


--
-- TOC entry 2857 (class 2606 OID 20445)
-- Name: slots burial_site_id; Type: FK CONSTRAINT; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE ONLY last_respects_dev.slots
    ADD CONSTRAINT burial_site_id FOREIGN KEY (burial_site_id) REFERENCES last_respects_dev.burial_sites(id);


--
-- TOC entry 2854 (class 2606 OID 20576)
-- Name: burial_sites burial_sites_fk; Type: FK CONSTRAINT; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE ONLY last_respects_dev.burial_sites
    ADD CONSTRAINT burial_sites_fk FOREIGN KEY (owner) REFERENCES last_respects_dev."user"(id);


--
-- TOC entry 2855 (class 2606 OID 20450)
-- Name: inventory burial_status_id; Type: FK CONSTRAINT; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE ONLY last_respects_dev.inventory
    ADD CONSTRAINT burial_status_id FOREIGN KEY (burial_site_id) REFERENCES last_respects_dev.burial_sites(id);


--
-- TOC entry 2858 (class 2606 OID 20455)
-- Name: slots created_by; Type: FK CONSTRAINT; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE ONLY last_respects_dev.slots
    ADD CONSTRAINT created_by FOREIGN KEY (created_by) REFERENCES last_respects_dev."user"(id);


--
-- TOC entry 2860 (class 2606 OID 20590)
-- Name: machinery_downtime_audit machinery_downtime_audit_fk; Type: FK CONSTRAINT; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE ONLY last_respects_dev.machinery_downtime_audit
    ADD CONSTRAINT machinery_downtime_audit_fk FOREIGN KEY (burial_site_id) REFERENCES last_respects_dev.burial_sites(id);


--
-- TOC entry 2859 (class 2606 OID 20460)
-- Name: slots updated_by; Type: FK CONSTRAINT; Schema: last_respects_dev; Owner: postgres
--

ALTER TABLE ONLY last_respects_dev.slots
    ADD CONSTRAINT updated_by FOREIGN KEY (updated_by) REFERENCES last_respects_dev."user"(id);


-- Completed on 2021-05-22 23:51:50 IST

--
-- PostgreSQL database dump complete
--

