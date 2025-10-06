from typing import List
from sqlalchemy.orm import Mapped, mapped_column, relationship
from adotau_api.db.database_config import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(nullable=False)
    last_name: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(unique=True, nullable=False)
    city: Mapped[str] = mapped_column(nullable=False)
    state: Mapped[str] = mapped_column(nullable=False)
    neighborhood: Mapped[str] = mapped_column(nullable=False)
    type_user: Mapped[str] = mapped_column(nullable=False)
    photourl: Mapped[str]
    phone: Mapped[str]
    login: Mapped[str] = mapped_column(unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    isdonor: Mapped[bool] = mapped_column(default=False)

    animals: Mapped[list["Animal"]] = relationship(
        back_populates="user", cascade="all, delete"
    )
    reviews: Mapped[list["Review"]] = relationship(
        back_populates="user", cascade="all, delete"
    )


from adotau_api.models.animal import Animal
from adotau_api.models.review import Review
