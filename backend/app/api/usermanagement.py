from pydantic import BaseModel
from fastapi import APIRouter, Query, HTTPException
from backend.app.services.usermanagementService import get_user_list, get_dept_list, create_user, update_user, delete_user

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

class UserUpdateRequest(BaseModel):
    rax_u_id:int
    rax_u_user_id: str
    rax_u_email: str
    rax_u_tel: str
    rax_u_dept: str
    rax_u_addr: str
    rax_u_dept_role: str

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
        raise HTTPException(status_code=500, detail=f"{str(e)}")

@router.put("/user/edit")
def user_update(edit_user: UserUpdateRequest):
    try:
        update_user(edit_user)
        return {"ok": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"{str(e)}")


@router.delete("/user/delete")
def user_delete(rax_u_id: int = Query(..., description="삭제할 사용자 rax_u_id")):
    try:
        delete_user(rax_u_id)
        return {"ok": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"{str(e)}")