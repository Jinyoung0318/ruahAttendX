from fastapi import APIRouter
from backend.app.services.attendanceService import get_attendance_list

router = APIRouter()

@router.get("/attendances")
def get_attendance():
    return get_attendance_list()
