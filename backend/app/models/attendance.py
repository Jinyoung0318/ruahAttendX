from sqlalchemy import Column, Integer, String, TIMESTAMP, Text, ForeignKey
from database import Base
from sqlalchemy.orm import relationship

class RaxAttendance(Base):
    __tablename__ = "rax_attendance"

    rax_a_id = Column(Integer, primary_key=True, index=True)
    rax_u_id = Column(Integer, ForeignKey('rax_user.rax_u_id'), nullable=False)  # 외래 키 설정
    rax_a_status = Column(String(1))
    rax_a_date = Column(TIMESTAMP)
    rax_a_remark = Column(Text)

    # 'RaxUser' 모델과의 관계 설정
    user = relationship("RaxUser", backref="attendances")
