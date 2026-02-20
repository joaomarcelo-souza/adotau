"""Review routes of API"""

from fastapi import APIRouter, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from adotau_api.schemas.review import ReviewCreate, ReviewRead, ReviewUpdate
from adotau_api.services.review_service import (
    create_review,
    get_all_reviews,
    get_review,
    update_review,
    delete_review,
)
from adotau_api.core.auth import decodeing_token_user
from adotau_api.db.database_config import get_db, Session

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")
router = APIRouter(prefix="/v1/review", tags=["Review"])


@router.post("/", response_model=ReviewRead, status_code=status.HTTP_201_CREATED)
def create_new_review(
    review: ReviewCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
):
    """Route that creates a new Review"""

    if not decodeing_token_user(token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Erro ao validar token"
        )

    return create_review(db, review)


@router.get("/list", response_model=list[ReviewRead], status_code=status.HTTP_200_OK)
def list_reviews(db: Session = Depends(get_db)):
    """Route that lists all Reviews"""
    return get_all_reviews(db)


@router.get("/{review_id}", response_model=ReviewRead, status_code=status.HTTP_200_OK)
def get_review_by_id(review_id: int, db: Session = Depends(get_db)):
    """Route that gets a Review by its id"""

    review = get_review(db, review_id)

    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Review não encontrada"
        )

    return review


@router.put("/{review_id}", response_model=ReviewRead, status_code=status.HTTP_200_OK)
def update_review_by_id(
    review_id: int,
    review: ReviewUpdate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
):
    """Route that updates a Review by its id"""

    if not decodeing_token_user(token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Erro ao validar token"
        )

    updated = update_review(db, review_id, review)

    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Review não atualizou"
        )

    return updated


@router.delete("/{review_id}", status_code=status.HTTP_200_OK)
def delete_review_by_id(
    review_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
):
    """Route that deletes a Review"""

    if not decodeing_token_user(token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Erro ao validar token"
        )

    deleted = delete_review(db, review_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review não foi removida",
        )

    return deleted
