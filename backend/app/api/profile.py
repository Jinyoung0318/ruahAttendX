import base64
from pydantic import BaseModel
from fastapi import APIRouter, Query
from app.services.profileService import get_user_info, update_user_info

router = APIRouter()

class UserProfileRequest(BaseModel):
    userUId: str

class UserUpdateRequest(BaseModel):
    userUId: int
    userId: str
    email: str
    phone: str
    password: str
    address: str

@router.get("/profile")
def get_user_profile(userUId: str = Query(...)):
    return get_user_info(userUId)

@router.post("/profile/save")
def save_user_profile(update: UserUpdateRequest):
    encoded_pwd = base64.b64encode(update.password.encode()).decode()
    update_data = {
        "userUId": update.userUId,
        "userId": update.userId,
        "email": update.email,
        "phone": update.phone,
        "password": encoded_pwd,
        "address": update.address
    }
    return update_user_info(update_data)  # <- 서비스 계층의 함수 호출