"""Animal routes of API"""

from fastapi import APIRouter, status, Depends, HTTPException
from adotau_api.schemas.animal import AnimalCreate, AnimalRead, AnimalUpdate
from adotau_api.services.animal_service import (
    get_animal,
    get_all_animals,
    create_animal,
    delete_animal,
    update_animal,
)
from adotau_api.db.database_config import get_db, Session

router = APIRouter(prefix="/v1/animal", tags=["Animal"])


@router.post(
    "/user/{donor_id}", response_model=AnimalRead, status_code=status.HTTP_200_OK
)
def create_new_animal(
    animal: AnimalCreate, donor_id: int, db: Session = Depends(get_db)
):
    """Route that creates a new Animal"""
    return create_animal(db, animal, donor_id)


@router.get("/list", response_model=list[AnimalRead], status_code=status.HTTP_200_OK)
def list_animals(db: Session = Depends(get_db)):
    """Route that lists all Animals"""
    return get_all_animals(db)


@router.get("/{animal_id}", response_model=AnimalRead, status_code=status.HTTP_200_OK)
def get_animal_by_id(animal_id: int, db: Session = Depends(get_db)):
    """Route that gets an Animal by his id"""

    animal = get_animal(db, animal_id)

    if not animal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Animal não encontrado"
        )

    return animal


@router.put("/{animal_id}", response_model=AnimalRead, status_code=status.HTTP_200_OK)
def update_animal_by_id(
    animal_id: int, animal: AnimalUpdate, db: Session = Depends(get_db)
):
    """Route that updates an Animal by his id"""

    updated = update_animal(db, animal_id, animal)

    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Animal não atualizou"
        )

    return updated


@router.delete("/{animal_id}", status_code=status.HTTP_200_OK)
def delete_animal_by_id(animal_id: int, db: Session = Depends(get_db)):
    """Route that deletes an Animal"""

    deleted = delete_animal(db, animal_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Animal não foi removido",
        )

    return deleted
