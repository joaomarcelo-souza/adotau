from sqlalchemy.orm import Session
from adotau_api.schemas.user import UserCreate, UserUpdate
from adotau_api.models.user import User


def create_user(db: Session, user_data: UserCreate):
    """Creates user on database"""

    user = User(**user_data.model_dump())
    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def get_all_users(db: Session):
    """Gets all users from database"""

    return db.query(User).all()


def get_user(db: Session, user_id: int):
    """Gets a user with his id from database"""

    return db.query(User).filter(User.id == user_id).first()


def update_user(db: Session, user_id: int, user_data: UserUpdate):
    """Updates a user with his id on database"""

    user = get_user(db, user_id)

    if user:
        for field, value in user_data.model_dump(exclude_unset=True).items():
            setattr(user, field, value)

        db.commit()
        db.refresh(user)

    return user


def delete_user(db: Session, user_id: int):
    """Deletes a user with his id on database"""

    user = get_user(db, user_id)

    if user:
        db.delete(user)
        db.commit()

    return user
