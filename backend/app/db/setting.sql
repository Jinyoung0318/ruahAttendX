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
COMMENT ON TABLE public.rax_dept IS '부서 정보';
COMMENT ON COLUMN public.rax_dept.rax_dt_id IS '부서 ID';
COMMENT ON COLUMN public.rax_dept.rax_dt_name IS '부서 이름';

CREATE TABLE IF NOT EXISTS public.rax_devices (
  rax_d_id varchar(50) PRIMARY KEY, -- 리더기 아이디
  rax_d_location text, -- 리더기 설치 위치
  rax_d_status varchar(1), -- 리더기 상태 (0: 작동 / 1: 오류)
  rax_d_remark text -- 비고
);
COMMENT ON TABLE public.rax_devices IS '리더기 정보';
COMMENT ON COLUMN public.rax_devices.rax_d_id IS '리더기 ID';
COMMENT ON COLUMN public.rax_devices.rax_d_location IS '설치 위치';
COMMENT ON COLUMN public.rax_devices.rax_d_status IS '작동 상태 (0: 작동, 1: 오류)';
COMMENT ON COLUMN public.rax_devices.rax_d_remark IS '비고 또는 설명';

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
   rax_u_status varchar(1) DEFAULT '2'-- (0: 졸업 / 1: 휴임 / 2: 봉사)
);
COMMENT ON TABLE public.rax_user IS '사용자 정보 테이블';
COMMENT ON COLUMN public.rax_user.rax_u_id IS '사용자 ID';
COMMENT ON COLUMN public.rax_user.rax_u_user_id IS '로그인용 사용자 ID';
COMMENT ON COLUMN public.rax_user.rax_u_user_name IS '사용자 이름';
COMMENT ON COLUMN public.rax_user.rax_u_uuid IS 'RFID 카드 UID';
COMMENT ON COLUMN public.rax_user.rax_u_par_name IS '세례명';
COMMENT ON COLUMN public.rax_user.rax_u_email IS '이메일';
COMMENT ON COLUMN public.rax_user.rax_u_pwd IS '비밀번호';
COMMENT ON COLUMN public.rax_user.rax_u_tel IS '전화번호';
COMMENT ON COLUMN public.rax_user.rax_u_dept IS '소속 부서명';
COMMENT ON COLUMN public.rax_user.rax_u_addr IS '주소';
COMMENT ON COLUMN public.rax_user.rax_u_birth IS '생년월일';
COMMENT ON COLUMN public.rax_user.rax_u_par_birth IS ' 축일 (MM-DD)';
COMMENT ON COLUMN public.rax_user.rax_u_dept_role IS '부서 내 역할 (예: 부장 등)';
COMMENT ON COLUMN public.rax_user.rax_u_status IS '사용자 상태 (0: 졸업, 1: 휴임, 2: 봉사)';


CREATE TABLE IF NOT EXISTS public.rax_attendance (
   rax_a_id serial, -- 출석체크 Index 칼럼
   rax_u_id int NOT NULL, -- 사용자 Index 칼럼
   rax_a_status varchar(1) DEFAULT '1', -- 출석 여부
   rax_a_date timestamp, -- 출석 날짜
   rax_a_remark text,
   PRIMARY KEY (rax_a_id, rax_u_id),
   CONSTRAINT fk_attendance_user FOREIGN KEY (rax_u_id) REFERENCES public.rax_user(rax_u_id)
);
COMMENT ON TABLE public.rax_attendance IS '출석 체크 기록 테이블';
COMMENT ON COLUMN public.rax_attendance.rax_a_id IS '출석 기록 ID ';
COMMENT ON COLUMN public.rax_attendance.rax_u_id IS '사용자 ID (FK)';
COMMENT ON COLUMN public.rax_attendance.rax_a_status IS '출석 여부 (0: 결석 / 1: 출석)';
COMMENT ON COLUMN public.rax_attendance.rax_a_date IS '출석 일시';
COMMENT ON COLUMN public.rax_attendance.rax_a_remark IS '비고 또는 사유';

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

INSERT INTO public.rax_user (
    rax_u_id,
    rax_u_user_id,
    rax_u_user_name,
    rax_u_uuid,
    rax_u_par_name,
    rax_u_email,
    rax_u_pwd,
    rax_u_tel,
    rax_u_dept,
    rax_u_addr,
    rax_u_birth,
    rax_u_par_birth,
    rax_u_dept_role,
    rax_u_status
) VALUES (
1,
'hugo',
'최영섭',
'0002208138',
'후고',
'hugo@ruah.com',
'YWRtaW4=',
'010-8127-5776',
'신부님',
'서울특별시 관악구 신림동 564-13 3층',
'1999-04-25',
'04-01',
'admin',
'2'
);
-- password는 admin

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