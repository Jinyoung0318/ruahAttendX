from typing import Optional
from fastapi import APIRouter, Query
from backend.app.services.attendanceService import get_attendance_list, get_recent_attendances

router = APIRouter()

@router.get("/attendances")
def get_attendance():
    return get_attendance_list()

@router.get("/recentAttendance")
def get_recent_attendance(start_date: Optional[str] = Query(None),
                          end_date: Optional[str] = Query(None),
                          rax_u_id: Optional[str] = Query(None)):
    return get_recent_attendances(start_date, end_date, rax_u_id)