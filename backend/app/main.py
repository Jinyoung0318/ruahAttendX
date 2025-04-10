from fastapi import FastAPI
from backend.app.api.attendance import router  # 수정된 임포트

app = FastAPI()
# 출석 라우터 연결
app.include_router(router, prefix="/api")