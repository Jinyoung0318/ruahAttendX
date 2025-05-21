from backend.database import SessionLocal
from backend.app.models.attendance import RaxAttendance
from backend.app.models.user import RaxUser
from datetime import datetime

def get_attendance_list():
    db = SessionLocal()
    return db.query(
        RaxUser.rax_u_id,
        RaxUser.rax_u_user_name,
        RaxUser.rax_u_par_name,
        RaxAttendance.rax_a_date
    ).join(
        RaxAttendance, RaxUser.rax_u_id == RaxAttendance.rax_u_id
    ).filter(
        RaxAttendance.rax_a_status == "1"
    ).limit(5).all()


def get_recent_attendances(start_date, end_date, rax_u_id):
    db = SessionLocal()

    try:
        rax_u_id = int(rax_u_id)
    except (TypeError, ValueError):
        return []

    query = db.query(
        RaxAttendance.rax_a_status,
        RaxAttendance.rax_a_date
    ).filter(RaxAttendance.rax_u_id == rax_u_id)

    if start_date and end_date:
        try:
            start_date_obj = datetime.strptime(start_date, '%Y-%m-%d').date()
            end_date_obj = datetime.strptime(end_date, '%Y-%m-%d').date()
            query = query.filter(
                RaxAttendance.rax_a_date >= start_date_obj,
                RaxAttendance.rax_a_date <= end_date_obj
            )
        except ValueError:
            pass

    return [{"status": status, "date": date.isoformat()} for status, date in query.all()]
