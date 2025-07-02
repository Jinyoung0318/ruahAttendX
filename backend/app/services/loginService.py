import base64
from fastapi import HTTPException
from database import SessionLocal
from app.models.user import RaxUser
from datetime import datetime
from sqlalchemy import Date, cast

# 복호화
def decrypt(encoded_text: str) -> str:
    return base64.b64decode(encoded_text.encode()).decode()

# 로그인 로직
def verify_user(user_id: str, password: str):
    db = SessionLocal()
    try:
        user = db.query(RaxUser).filter(RaxUser.rax_u_user_id == user_id).first()
        if not user:
            return None
        decrypted_password = decrypt(user.rax_u_pwd)
        print(decrypted_password)
        if decrypted_password != password:
            return None

        return {
            "userUId":user.rax_u_id,
            "userId": user.rax_u_user_id,
            "userName": user.rax_u_user_name,
            "userParName": user.rax_u_par_name,
            "userDept": user.rax_u_dept,
            "userDeptRole": user.rax_u_dept_role
        }
    except Exception:
        return None
    finally:
        db.close()

from app.models.attendance import RaxAttendance

def get_recent_attendance_records():
    db = SessionLocal()
    try:
        return (
            db.query(RaxAttendance)
            .order_by(RaxAttendance.rax_a_id.desc())
            .limit(5)
            .all()
        )
    finally:
        db.close()

def enrich_attendance_with_user_info(records):
    db = SessionLocal()
    try:
        result = []
        for r in records:
            user = db.query(RaxUser).filter(RaxUser.rax_u_id == r.rax_u_id).first()
            if user:
                result.append({
                    "userName": user.rax_u_user_name,
                    "userParName": user.rax_u_par_name,
                    "attendanceDate": r.rax_a_date.strftime("%Y-%m-%d"),
                })
        return result
    finally:
        db.close()

def get_recent_attendaces_users():
    records = get_recent_attendance_records()
    return enrich_attendance_with_user_info(records)

def check_attendance(card_num: str):
    db = SessionLocal()
    try:
        user = db.query(RaxUser).filter(RaxUser.rax_u_uuid == card_num).first()
        if not user:
            raise HTTPException(status_code=400, detail="등록되지 않은 카드입니다.")

        today = datetime.now().date()

        existing = (
            db.query(RaxAttendance)
            .filter(RaxAttendance.rax_u_id == user.rax_u_id)
            .filter(cast(RaxAttendance.rax_a_date, Date) == today)
            .first()
        )

        if existing :
            return {"status" : "ok", "message" : "오늘은 이미 출석하셨습니다."}

        attendance = RaxAttendance(
            rax_u_id=user.rax_u_id,
            rax_a_status="1",
            rax_a_date=datetime.now()
        )

        db.add(attendance)
        db.commit()
        return {"status" : "ok", "message" : "출석 처리 완료"}
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()