--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4 (Ubuntu 11.4-1.pgdg16.04+1)
-- Dumped by pg_dump version 12.1 (Ubuntu 12.1-1.pgdg16.04+1)

-- Started on 2021-05-17 00:12:06 IST

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
-- TOC entry 2938 (class 1262 OID 85170)
-- Name: last_respects_dev; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE last_respects_dev WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_IN' LC_CTYPE = 'en_IN';


ALTER DATABASE last_respects_dev OWNER TO postgres;

\connect last_respects_dev

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

SET default_tablespace = '';

--
-- TOC entry 196 (class 1259 OID 85171)
-- Name: burial_sites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.burial_sites (
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
    site_type character varying(200) NOT NULL
);


ALTER TABLE public.burial_sites OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 85252)
-- Name: burial_sites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.burial_sites ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.burial_sites_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 197 (class 1259 OID 85179)
-- Name: inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory (
    id bigint NOT NULL,
    burial_site_id bigint NOT NULL,
    item character varying(40) NOT NULL,
    status character varying(40) NOT NULL
);


ALTER TABLE public.inventory OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 85254)
-- Name: inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.inventory ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.inventory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 199 (class 1259 OID 85206)
-- Name: slot_meta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.slot_meta (
    burial_site_id bigint NOT NULL,
    slot character varying NOT NULL,
    valid_from date NOT NULL,
    valid_till date NOT NULL,
    id bigint NOT NULL
);


ALTER TABLE public.slot_meta OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 85256)
-- Name: slot_meta_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.slot_meta ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.slot_meta_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 202 (class 1259 OID 85229)
-- Name: slots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.slots (
    burial_site_id bigint NOT NULL,
    status character varying(100) NOT NULL,
    covid_related boolean NOT NULL,
    attender_name character varying(200) NOT NULL,
    attender_contact character varying(100) NOT NULL,
    reason_for_cancellation character varying(1000) NOT NULL,
    date_of_cremation date NOT NULL,
    deceased_name character varying(100) NOT NULL,
    created_by bigint NOT NULL,
    updated_by bigint NOT NULL,
    death_cert_no bigint NOT NULL,
    proof_type text,
    proof_id character varying(200),
    created_time timestamp without time zone,
    updated_time timestamp without time zone,
    slot character varying(200),
    id bigint NOT NULL
);


ALTER TABLE public.slots OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 85227)
-- Name: slots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.slots ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.slots_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 198 (class 1259 OID 85195)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    name character varying NOT NULL,
    password character varying(1000) NOT NULL,
    burial_site_id bigint NOT NULL,
    id bigint NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 85217)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 2923 (class 0 OID 85171)
-- Dependencies: 196
-- Data for Name: burial_sites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.burial_sites (id, lat, long, status, city, address, zone_or_division, site_name, contact_no, admin_type, site_type) FROM stdin;
\.


--
-- TOC entry 2924 (class 0 OID 85179)
-- Dependencies: 197
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory (id, burial_site_id, item, status) FROM stdin;
\.


--
-- TOC entry 2926 (class 0 OID 85206)
-- Dependencies: 199
-- Data for Name: slot_meta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.slot_meta (burial_site_id, slot, valid_from, valid_till, id) FROM stdin;
\.


--
-- TOC entry 2929 (class 0 OID 85229)
-- Dependencies: 202
-- Data for Name: slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.slots (burial_site_id, status, covid_related, attender_name, attender_contact, reason_for_cancellation, date_of_cremation, deceased_name, created_by, updated_by, death_cert_no, proof_type, proof_id, created_time, updated_time, slot, id) FROM stdin;
\.


--
-- TOC entry 2925 (class 0 OID 85195)
-- Dependencies: 198
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (name, password, burial_site_id, id) FROM stdin;
\.


--
-- TOC entry 2939 (class 0 OID 0)
-- Dependencies: 203
-- Name: burial_sites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.burial_sites_id_seq', 1, false);


--
-- TOC entry 2940 (class 0 OID 0)
-- Dependencies: 204
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventory_id_seq', 1, false);


--
-- TOC entry 2941 (class 0 OID 0)
-- Dependencies: 205
-- Name: slot_meta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.slot_meta_id_seq', 1, false);


--
-- TOC entry 2942 (class 0 OID 0)
-- Dependencies: 201
-- Name: slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.slots_id_seq', 1, false);


--
-- TOC entry 2943 (class 0 OID 0)
-- Dependencies: 200
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- TOC entry 2787 (class 2606 OID 85178)
-- Name: burial_sites burial_sites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.burial_sites
    ADD CONSTRAINT burial_sites_pkey PRIMARY KEY (id);


--
-- TOC entry 2789 (class 2606 OID 85183)
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (id);


--
-- TOC entry 2793 (class 2606 OID 85265)
-- Name: slot_meta slot_meta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slot_meta
    ADD CONSTRAINT slot_meta_pkey PRIMARY KEY (id);


--
-- TOC entry 2795 (class 2606 OID 85236)
-- Name: slots slots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots
    ADD CONSTRAINT slots_pkey PRIMARY KEY (id);


--
-- TOC entry 2791 (class 2606 OID 85226)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2797 (class 2606 OID 85201)
-- Name: user burial_site_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT burial_site_id FOREIGN KEY (burial_site_id) REFERENCES public.burial_sites(id);


--
-- TOC entry 2798 (class 2606 OID 85212)
-- Name: slot_meta burial_site_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slot_meta
    ADD CONSTRAINT burial_site_id FOREIGN KEY (burial_site_id) REFERENCES public.burial_sites(id);


--
-- TOC entry 2799 (class 2606 OID 85237)
-- Name: slots burial_site_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots
    ADD CONSTRAINT burial_site_id FOREIGN KEY (burial_site_id) REFERENCES public.burial_sites(id);


--
-- TOC entry 2796 (class 2606 OID 85184)
-- Name: inventory burial_status_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT burial_status_id FOREIGN KEY (burial_site_id) REFERENCES public.burial_sites(id);


--
-- TOC entry 2800 (class 2606 OID 85242)
-- Name: slots created_by; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots
    ADD CONSTRAINT created_by FOREIGN KEY (created_by) REFERENCES public."user"(id);


--
-- TOC entry 2801 (class 2606 OID 85247)
-- Name: slots updated_by; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots
    ADD CONSTRAINT updated_by FOREIGN KEY (updated_by) REFERENCES public."user"(id);


-- Completed on 2021-05-17 00:12:06 IST

--
-- PostgreSQL database dump complete
--

