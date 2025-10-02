"""User routes of API"""

from fastapi import APIRouter, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from adotau_api.schemas.user import UserCreate, UserRead, UserUpdate
from adotau_api.services.user_service import (
    create_user,
    get_all_users,
    get_user,
    update_user,
    delete_user,
)
from adotau_api.core.auth import decodeing_token_user
from adotau_api.db.database_config import get_db, Session

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")
router = APIRouter(prefix="/v1/user", tags=["User"])


@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    """Route that creates a new User"""
    return create_user(db, user)


@router.get("/list", response_model=list[UserRead], status_code=status.HTTP_200_OK)
def list_users(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    """Route that lists all Users"""

    if not decodeing_token_user(token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Erro ao validar token"
        )

    return get_all_users(db)


@router.get("/{user_id}", response_model=UserRead, status_code=status.HTTP_200_OK)
def get_user_by_id(
    user_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    """Route that gets a User by his id"""

    if not decodeing_token_user(token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Erro ao validar token"
        )

    user = get_user(db, user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado"
        )

    return user


@router.put("/{user_id}", response_model=UserRead, status_code=status.HTTP_200_OK)
def update_user_by_id(
    user_id: int,
    user: UserUpdate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
):
    """Route that updates a User by his id"""

    if not decodeing_token_user(token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Erro ao validar token"
        )

    updated = update_user(db, user_id, user)

    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não atualizou"
        )

    return updated


@router.delete("/{user_id}", status_code=status.HTTP_200_OK)
def delete_user_by_id(
    user_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    """Route that deletes a User"""

    if not decodeing_token_user(token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Erro ao validar token"
        )

    deleted = delete_user(db, user_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não foi removido",
        )

    return deleted
