import base64
from backend.database import SessionLocal
from backend.app.models.user import RaxUser

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

        decrypted_password = decrypt(user.rax_u_password)
        if decrypted_password != password:
            return None

        return {
            "userId": user.rax_u_user_id,
            "userName": user.rax_u_user_name,
            "userParName": user.rax_u_par_name,
            "userDept": user.rax_u_dept
        }
    except Exception:
        return None
    finally:
        db.close()
