from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.app.models.attendance import RaxAttendance
from backend.app.models.user import RaxUser

router = APIRouter()

# DB 세션을 생성하고 반환하는 함수
def get_db():
    db = SessionLocal()  # SessionLocal에서 DB 세션을 가져옴
    try:
        yield db
    finally:
        db.close()  # 요청 후 세션 종료

@router.get("/attendances")
def get_attendance(db: Session = Depends(get_db)):
    # RaxUser와 RaxAttendance 테이블을 rax_u_id를 기준으로 조인
    results = db.query(RaxUser.rax_u_id, RaxUser.rax_u_user_name, RaxUser.rax_u_par_name, RaxAttendance.rax_a_date) \
        .join(RaxAttendance, RaxUser.rax_u_id == RaxAttendance.rax_u_id) \
        .filter(RaxAttendance.rax_a_status == "1") \
        .all()

    return results