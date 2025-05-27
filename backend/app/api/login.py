from fastapi import APIRouter
from backend.app.services.loginService import verify_user, get_recent_attendaces_users
from pydantic import BaseModel
router = APIRouter()

class LoginRequest(BaseModel) :
    userId: str
    password: str

@router.post("/login")
def login_user(login_data: LoginRequest):
    user = verify_user(login_data.userId, login_data.password)
    # return 값이 없으면 Null로 return
    return user

@router.get("/attendances/recent")
def get_recent_attendaces ():
    user = get_recent_attendaces_users()
    return user
