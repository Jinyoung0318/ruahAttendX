from database import engine
from database import Base

# 테이블을 생성합니다.
Base.metadata.create_all(bind=engine)