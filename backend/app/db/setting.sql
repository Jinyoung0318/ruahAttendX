-- setting.sql
-- PostgreSQL DB 초기화 스크립트 (ver. 15.12)

-- ==========================================
-- # Step 1: SCHEMA 생성
-- ==========================================
CREATE SCHEMA IF NOT EXISTS public AUTHORIZATION pg_database_owner;
COMMENT ON SCHEMA public IS 'standard public schema';

-- ==========================================
-- # Step 2: TABLE 생성
-- ==========================================

CREATE TABLE IF NOT EXISTS public.rax_dept (
   rax_dt_id serial PRIMARY KEY, -- 부서정보 Index 칼럼
   rax_dt_name varchar(10) NOT NULL -- 부서명
);

CREATE TABLE IF NOT EXISTS public.rax_devices (
  rax_d_id varchar(50) PRIMARY KEY, -- 리더기 아이디
  rax_d_location text, -- 리더기 설치 위치
  rax_d_status varchar(1), -- 리더기 상태 (0: 작동 / 1: 오류)
  rax_d_remark text -- 비고
);

CREATE TABLE IF NOT EXISTS public.rax_user (
   rax_u_id serial PRIMARY KEY, -- 사용자 Index 칼럼
   rax_u_user_id varchar(15) NOT NULL UNIQUE, -- 사용자 아이디
   rax_u_user_name varchar(15),
   rax_u_uuid varchar(16),
   rax_u_par_name varchar(15),
   rax_u_email text,
   rax_u_pwd varchar(20),
   rax_u_tel varchar(13),
   rax_u_dept varchar(10),
   rax_u_addr text,
   rax_u_birth date,
   rax_u_par_birth varchar(5),
   rax_u_dept_role varchar(5),
   rax_u_status varchar(1) -- (0: 졸업 / 1: 휴임 / 2: 봉사)
);

CREATE TABLE IF NOT EXISTS public.rax_attendance (
   rax_a_id serial, -- 출석체크 Index 칼럼
   rax_u_id int NOT NULL, -- 사용자 Index 칼럼
   rax_a_status varchar(1), -- 출석 여부
   rax_a_date timestamp, -- 출석 날짜
   rax_a_remark text,
   PRIMARY KEY (rax_a_id, rax_u_id),
   CONSTRAINT fk_attendance_user FOREIGN KEY (rax_u_id) REFERENCES public.rax_user(rax_u_id)
);

-- ==========================================
-- # Step 3: COMMENT 및 제약 조건
-- ==========================================
-- (생략 가능 / 필요한 경우 COMMENT ON COLUMN 추가)

-- ==========================================
-- # Step 4: 데이터 Seeding
-- ==========================================
INSERT INTO public.rax_dept (rax_dt_name) VALUES
    ('신부님'),
    ('회장단'),
    ('찬양부'),
    ('총무부'),
    ('전례부'),
    ('미디어부')
ON CONFLICT DO NOTHING;

-- ==========================================
-- # Step 5: 권한 부여
-- ==========================================
ALTER TABLE public.rax_dept OWNER TO postgres;
ALTER TABLE public.rax_devices OWNER TO postgres;
ALTER TABLE public.rax_user OWNER TO postgres;
ALTER TABLE public.rax_attendance OWNER TO postgres;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;

-- ==========================================
-- [옵션] 명시적 SEQUENCE 생성 방식 (serial 대신 사용하는 경우)
-- ==========================================
CREATE SEQUENCE IF NOT EXISTS public.rax_user_rax_u_id_seq
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
    CACHE 1
    NO CYCLE;

CREATE TABLE IF NOT EXISTS public.rax_user (
    rax_u_id int NOT NULL DEFAULT nextval('public.rax_user_rax_u_id_seq') PRIMARY KEY, -- 사용자 Index 칼럼
    rax_u_user_id varchar(15) NOT NULL UNIQUE, -- 사용자 아이디
    rax_u_user_name varchar(15),
    rax_u_uuid varchar(16),
    rax_u_par_name varchar(15),
    rax_u_email text,
    rax_u_pwd varchar(20),
    rax_u_tel varchar(13),
    rax_u_dept varchar(10),
    rax_u_addr text,
    rax_u_birth date,
    rax_u_par_birth varchar(5),
    rax_u_dept_role varchar(5),
    rax_u_status varchar(1) -- (0: 졸업 / 1: 휴임 / 2: 봉사)
);