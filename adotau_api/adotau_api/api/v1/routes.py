from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, OAuth2PasswordRequestForm
from adotau_api.db.database_config import get_db, Session
from adotau_api.schemas.user import UserLogin
from adotau_api.services.user_service import login_user

security = HTTPBearer()
router = APIRouter()


@router.get("/secure-endpoint", dependencies=[Depends(security)])
def secure_endpoint():
    return {"message": "Entrou"}


@router.post("/token")
def login_user_token(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user_input = UserLogin(email=form_data.username, password=form_data.password)

    user = login_user(db, user_input)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Não autorizado"
        )

    else:
        return user
