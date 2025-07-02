from sqlalchemy import Column, String, Text
from database import Base

class RaxDevices(Base):
    __tablename__ = "rax_devices"

    rax_d_id = Column(String(50), primary_key=True)  # 리더기 아이디
    rax_d_location = Column(Text)  # 리더기 설치 위치
    rax_d_status = Column(String(1))  # 리더기 상태 (0: 작동 / 1: 오류)
    rax_d_remark = Column(Text)  # 비고
