from backend.app.models.attendance import RaxAttendance
from backend.database import SessionLocal
from backend.app.models.user import RaxUser
from backend.app.models.dept import RaxDept
import base64

from datetime import datetime, timedelta


def get_active_users(db):
    return db.query(RaxUser).filter(RaxUser.rax_u_status == '2').all()

def get_user_attendance(db, rax_u_id: int):
    return db.query(RaxAttendance).filter(RaxAttendance.rax_u_id == rax_u_id).all()

def calculate_attendance_rate(attendances):
    current_year = datetime.now().year
    start_date = datetime(current_year, 1, 1)
    end_date = datetime(current_year, 12, 31)

    total_target_days = 0
    d = start_date
    while d <= end_date:
        if d.weekday() in [2, 4]:  # Wednesday=2, Friday=4
            total_target_days += 1
        d += timedelta(days=1)

    attended_days = sum(
        1 for record in attendances
        if record.rax_a_status == "1"
        and record.rax_a_date.year == current_year
        and record.rax_a_date.weekday() in [2, 4]
    )

    return round(attended_days / total_target_days * 100, 1) if total_target_days else 0

def get_user_list(page: int, limit: int):
    db = SessionLocal()
    try:
        active_users = get_active_users(db)
        total = len(active_users)
        offset = (page - 1) * limit
        paginated_users = active_users[offset:offset + limit]

        user_data = []
        for user in paginated_users:
            attendances = get_user_attendance(db, user.rax_u_id)
            attendance_rate = calculate_attendance_rate(attendances)
            user_dict = user.__dict__.copy()
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
        # 아이디 중복 확인
        existing_user = db.query(RaxUser).filter(RaxUser.rax_u_user_id == data.rax_u_user_id).first()
        if existing_user:
            raise Exception("이미 존재하는 아이디입니다.")
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

def update_user(data):
    db = SessionLocal()
    try:
        user = db.query(RaxUser).filter(RaxUser.rax_u_id == data.rax_u_id).first()
        if not user:
            raise Exception("해당 사용자를 찾을 수 없습니다.")

        user.rax_u_user_id = data.rax_u_user_id
        user.rax_u_email = data.rax_u_email
        user.rax_u_tel = data.rax_u_tel
        user.rax_u_addr = data.rax_u_addr
        user.rax_u_dept = data.rax_u_dept
        user.rax_u_dept_role = data.rax_u_dept_role

        db.commit()
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

def delete_user(rax_u_id: int):
    db = SessionLocal()
    try:
        user = db.query(RaxUser).filter(RaxUser.rax_u_id == rax_u_id).first()
        if not user:
            raise Exception("해당 사용자가 존재하지 않습니다.")
        db.delete(user)
        db.commit()
    finally:
        db.close()