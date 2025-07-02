from fastapi import HTTPException
from database import SessionLocal
from app.models.user import RaxUser

def regist_card(rax_u_id: int, rax_u_uuid: str):
    db = SessionLocal()
    try:
        user = db.query(RaxUser).filter(RaxUser.rax_u_id == rax_u_id).first()
        if user is None:
            raise HTTPException(status_code=400, detail="등록되지 않은 사용자입니다.")

        user.rax_u_uuid = rax_u_uuid
        db.commit()
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()
