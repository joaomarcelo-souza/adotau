from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from adotau_api.db.database_config import Base
from adotau_api.models.user import User


class Animal(Base):
    __tablename__ = "animal"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str]
    species: Mapped[str]
    sex: Mapped[str]
    age: Mapped[int]
    size: Mapped[str]
    description: Mapped[str]
    city: Mapped[str]
    state: Mapped[str]
    neighborhood: Mapped[str]
    photourl: Mapped[str]

    donor_id: Mapped[int] = mapped_column(ForeignKey("user.id"))

    user: Mapped["User"] = relationship(back_populates="animals")
