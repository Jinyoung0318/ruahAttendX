from backend.database import SessionLocal
from backend.app.models.user import RaxUser

def get_user_info(userUId: str):
    db = SessionLocal()
    try:
        user = db.query(RaxUser).filter(RaxUser.rax_u_id == userUId).first()
        print("1",user)
        if not user:
            return None
        return user
    except Exception:
        return None
    finally:
        db.close()

def update_user_info(data: dict):
    db = SessionLocal()
    try:
        user = db.query(RaxUser).filter(RaxUser.rax_u_id == data["userUId"]).first()
        if user:
            user.rax_u_id = data["userId"]
            user.rax_u_email = data["email"]
            user.rax_u_tel = data["phone"]
            user.rax_u_pwd = data["password"]
            user.rax_u_addr = data["address"]
            db.commit()
            return True
        return False
    except Exception as e:
        db.rollback()
        print("Update error:", e)
        return False
    finally:
        db.close()
