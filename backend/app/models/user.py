from sqlalchemy import Column, Integer, String, Text, Date
from backend.database import Base

class RaxUser(Base):
    __tablename__ = "rax_user"

    rax_u_id = Column(Integer, primary_key=True, index=True)
    rax_u_user_id = Column(String(15), unique=True, nullable=False)
    rax_u_user_name = Column(String(15))
    rax_u_uuid = Column(String(16))
    rax_u_par_name = Column(String(15))
    rax_u_email = Column(Text)
    rax_u_pwd = Column(String(20))
    rax_u_tel = Column(String(13))
    rax_u_dept = Column(String(10))
    rax_u_addr = Column(Text)
    rax_u_birth = Column(Date)
    rax_u_par_birth = Column(Date)
    rax_u_dept_role = Column(String(5))
    rax_u_status = Column(String(1))
