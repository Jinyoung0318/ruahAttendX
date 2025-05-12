from fastapi import FastAPI
from backend.app.api.login import router as login_router
from backend.app.api.attendance import router as attendance_router
from backend.app.api.profile import router as profile_router

app = FastAPI()
# 출석 라우터 연결
app.include_router(login_router, prefix="/api")
app.include_router(attendance_router, prefix="/api")
app.include_router(profile_router, prefix="/api")