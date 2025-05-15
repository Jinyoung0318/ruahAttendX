from datetime import datetime
from sqlalchemy import extract, func, case
from backend.app.models.attendance import RaxAttendance
from backend.database import SessionLocal
from backend.app.models.user import RaxUser
from backend.app.models.dept import RaxDept
import base64

def get_user_list(page: int, limit: int):
    db = SessionLocal()
    try:
        total = db.query(RaxUser).count()
        offset = (page - 1) * limit
        current_year = datetime.now().year

        attendance_subquery = (
            db.query(
                RaxAttendance.rax_u_id.label("user_id"),
                func.count().label("total"),
                func.sum(case((RaxAttendance.rax_a_status == "출석", 1), else_=0)).label("attended")
            )
            .filter(extract("year", RaxAttendance.rax_a_date) == current_year)
            .group_by(RaxAttendance.rax_u_id)
            .subquery()
        )

        users_with_attendance = (
            db.query(
                RaxUser,
                attendance_subquery.c.total,
                attendance_subquery.c.attended
            )
            .outerjoin(attendance_subquery, RaxUser.rax_u_id == attendance_subquery.c.user_id)
            .order_by(RaxUser.rax_u_id.asc())
            .offset(offset)
            .limit(limit)
            .all()
        )

        user_data = []
        for user, total_att, attended in users_with_attendance:
            user_dict = user.__dict__.copy()
            if total_att and total_att > 0:
                attendance_rate = round(attended / total_att * 100, 1) if attended else 0
            else:
                attendance_rate = 0
            user_dict["year_attendance_rate"] = attendance_rate
            user_data.append(user_dict)

        return {
            "total": total,
            "users": user_data
        }
    finally:
        db.close()


def get_dept_list():
    db = SessionLocal()
    try:
        depts = db.query(RaxDept).all()
        return [dept.rax_dt_name for dept in depts]
    finally:
        db.close()


def create_user(data):
    encoded_pwd = base64.b64encode(data.rax_u_pwd.encode()).decode()
    db = SessionLocal()
    try:
        new_user = RaxUser(
            rax_u_user_id=data.rax_u_user_id,
            rax_u_user_name=data.rax_u_user_name,
            rax_u_par_name=data.rax_u_par_name,
            rax_u_email=data.rax_u_email,
            rax_u_tel=data.rax_u_tel,
            rax_u_dept=data.rax_u_dept,
            rax_u_addr=data.rax_u_addr,
            rax_u_birth=data.rax_u_birth,
            rax_u_par_birth=data.rax_u_par_birth,
            rax_u_dept_role=data.rax_u_dept_role,
            rax_u_pwd=encoded_pwd
        )
        db.add(new_user)
        db.commit()
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()
