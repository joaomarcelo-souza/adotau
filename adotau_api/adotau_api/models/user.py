from typing import List
from sqlalchemy.orm import Mapped, mapped_column, relationship
from adotau_api.db.database_config import Base


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    name: Mapped[str]
    last_name: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)
    city: Mapped[str]
    state: Mapped[str]
    neighborhood: Mapped[str]
    type_user: Mapped[str]
    isdonor: Mapped[bool]
    photourl: Mapped[str]
    phone: Mapped[str]
    password: Mapped[str]
    isactive: Mapped[bool]

    animals: Mapped[List["Animal"]] = relationship(
        back_populates="user", cascade="all, delete"
    )


from adotau_api.models.animal import Animal
