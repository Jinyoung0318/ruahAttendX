from sqlalchemy import Column, String
from backend.database import Base

class RaxDevices(Base):
    __tablename__ = "rax_dept"

    rax_dt_id = Column(String(50), primary_key=True)  # 리더기 아이디
    rax_dt_name = Column(String(10))
