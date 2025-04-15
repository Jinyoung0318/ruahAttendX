from fastapi import APIRouter
from backend.app.services.loginService import verify_user
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