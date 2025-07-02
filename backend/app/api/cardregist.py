from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from app.services.cardregistService import regist_card

router = APIRouter()

@router.post("/card/regist")
async def save_card_num(request: Request):
    data = await request.json()
    user_id = data.get("rax_u_id")
    card_uid = data.get("rax_u_uuid")
    if not user_id or not card_uid:
        return JSONResponse(content={"status": "fail", "message": "필수 항목 누락"})

    try:
        result = regist_card(user_id, card_uid)
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(status_code=400, content={"status": "fail", "message": str(e)})