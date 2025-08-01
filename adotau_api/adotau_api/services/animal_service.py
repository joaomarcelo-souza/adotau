from sqlalchemy.orm import Session
from adotau_api.schemas.animal import AnimalCreate, AnimalUpdate
from adotau_api.models.animal import Animal


def create_animal(db: Session, animal_data: AnimalCreate, donor_id: int):
    """Creates an animal on database"""

    animal = Animal(**animal_data.model_dump(), donor_id=donor_id)
    db.add(animal)
    db.commit()
    db.refresh(animal)

    return animal


def get_all_animals(db: Session):
    """Gets all animals from database"""

    return db.query(Animal).all()


def get_animal(db: Session, animal_id: int):
    """Gets an animal with its id from database"""

    return db.query(Animal).filter(Animal.id == animal_id).first()


def update_animal(db: Session, animal_id: int, animal_data: AnimalUpdate):
    """Updates an animal with its id on database"""

    animal = get_animal(db, animal_id)

    if animal:
        for field, value in animal_data.model_dump(exclude_unset=True).items():
            setattr(animal, field, value)

        db.commit()
        db.refresh(animal)

    return animal


def delete_animal(db: Session, animal_id: int):
    """Deletes an animal with its id on database"""

    animal = get_animal(db, animal_id)

    if animal:
        db.delete(animal)
        db.commit()

    return animal
