from pydantic import BaseModel
from fastapi import APIRouter, Query
from backend.app.services.usermanagementService import get_user_list

router = APIRouter()


@router.get("/user/list")
def list_users(
        page: int = Query(1, ge=1),
        limit: int = Query(10, ge=1, le=100)
):
    return get_user_list(page=page, limit=limit)