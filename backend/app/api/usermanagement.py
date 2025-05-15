from pydantic import BaseModel
from fastapi import APIRouter, Query, HTTPException
from backend.app.services.usermanagementService import get_user_list, get_dept_list, create_user

router = APIRouter()

class UserCreateRequest(BaseModel):
    rax_u_user_id: str
    rax_u_user_name: str
    rax_u_par_name: str
    rax_u_email: str
    rax_u_tel: str
    rax_u_dept: str
    rax_u_addr: str
    rax_u_birth: str
    rax_u_par_birth: str
    rax_u_dept_role: str
    rax_u_pwd: str

@router.get("/user/list")
def list_users(
        page: int = Query(1, ge=1),
        limit: int = Query(10, ge=1, le=100)
):
    return get_user_list(page=page, limit=limit)

@router.get("/dept/list")
def dept_list():
    return {
        "departments": get_dept_list()
    }

@router.post("/user/add")
def user_create(new_user: UserCreateRequest):
    try:
        create_user(new_user)
        return {"ok": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"등록 실패: {str(e)}")