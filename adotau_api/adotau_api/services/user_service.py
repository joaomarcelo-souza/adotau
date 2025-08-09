from sqlalchemy.orm import Session
from adotau_api.schemas.user import UserCreate, UserUpdate, UserLogin, UserRead
from adotau_api.models.user import User
from adotau_api.core.auth import verify_password, create_access_token, get_password_hash


def create_user(db: Session, user_data: UserCreate):
    """Creates user on database"""
    user_dict = user_data.model_dump()
    user_dict["password"] = get_password_hash(user_dict.pop("password"))

    user = User(**user_dict)
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
        user_dict = user_data.model_dump(exclude_unset=True)

        if "password" in user_dict:
            user_dict["password"] = get_password_hash(user_dict.pop("password"))

        for field, value in user_dict.items():
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


def login_user(db: Session, credentials: UserLogin):
    user = db.query(User).filter(User.email == credentials.email).first()

    if not user or not verify_password(credentials.password, user.password):
        return False

    token = create_access_token(data={"sub": user.email})

    user_data = UserRead.from_orm(user)

    return {"access_token": token, "token_type": "bearer", "user": user_data}
