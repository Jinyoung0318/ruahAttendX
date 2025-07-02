from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from app.services.loginService import verify_user, get_recent_attendaces_users, check_attendance
from pydantic import BaseModel
router = APIRouter()

class LoginRequest(BaseModel) :
    userId: str
    password: str

class CardNumber(BaseModel) :
    card_uid: str

@router.post("/login")
def login_user(login_data: LoginRequest):
    user = verify_user(login_data.userId, login_data.password)
    return user

@router.get("/attendances/recent")
def get_recent_attendaces ():
    user = get_recent_attendaces_users()
    return user

@router.post("/attendances/check")
async def check_attendances(request: Request):
    data = await request.json()
    card_uid = data.get("card_uid")
    if not card_uid:
        return JSONResponse(status_code=400, content={"status": "fail", "message": "카드 UID 누락"})

    try:
        result = check_attendance(card_uid)
        return JSONResponse(content=result)
    except HTTPException as he:
        return JSONResponse(status_code=he.status_code, content={"status": "fail", "message": he.detail})
    except Exception as e:
        return JSONResponse(status_code=500, content={"status": "fail", "message": str(e)})