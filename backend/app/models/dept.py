from sqlalchemy import Column, String
from database import Base

class RaxDept(Base):
    __tablename__ = "rax_dept"

    rax_dt_id = Column(String(50), primary_key=True)
    rax_dt_name = Column(String(10))
