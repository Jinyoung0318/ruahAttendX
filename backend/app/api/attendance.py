from fastapi import APIRouter
from backend.app.services.attendanceService import get_attendance_list
from backend.app.services.attendanceService import get_recent_attendances

router = APIRouter()

@router.get("/attendances")
def get_attendance():
    return get_attendance_list()

@router.get("/recentAttendance")
def get_recent_attendance(start_date: str, end_date: str, userid: str):
    return get_recent_attendances(start_date, end_date, userid)
