# ruahAttendX
ruah_attend_system

- 프로젝트 이름 : Ruah_Attendance_X
- **의도** :
    - 출석률 확인과 출석률에 따른 준봉사자 및 정봉사자의 역할 분배를 위함
- 구체적인 목표 :
    - 실제 RFID 카드 리더기와 더불어 출석률에 대한 지표를 확인

- 기간 :  ~ 2025.12

- 소스코드 저장소 (Git) : https://github.com/Jinyoung0318/ruahAttendX.git

- 개발 스팩
1. Backend : Python (FastAPI 사용) version 3.11.7
2. Frontend : React (Vite 사용) version  10.8.2 / NodeJs version 20.19.0  / Vite version 6.2.0
3. Database : PostgreSQL version 15.12
4. RFID 관련 연동 : Python + serial 라이브러리 활용
    - 실시간 처리 : FastAPI의 WebSocket / [Socket.IO](http://Socket.IO) 활용