from backend.database import SessionLocal
from backend.app.models.attendance import RaxAttendance
from backend.app.models.user import RaxUser

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
