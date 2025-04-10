# from sqlalchemy.orm import Session
from backend.database import SessionLocal

# DB 세션을 생성하고 반환하는 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()