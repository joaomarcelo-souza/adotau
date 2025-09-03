from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, EmailStr
from adotau_api.schemas.animal import AnimalRead


class UserType(str, Enum):
    DOADOR = "Doador"
    ADOTANTE = "Adotante"


class UserBase(BaseModel):
    name: str
    last_name: str
    email: EmailStr
    city: str
    state: str
    neighborhood: str
    type_user: UserType
    photourl: str
    phone: str
    login: str
    password: str


class UserCreate(UserBase):
    """User create schema"""


class UserRead(UserBase):
    isdonor: bool
    id: int
    animals: List[AnimalRead] = []

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):

    name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    city: Optional[str] = None
    state: Optional[str] = None
    neighborhood: Optional[str] = None
    type_user: Optional[UserType] = None
    photourl: Optional[str] = None
    phone: Optional[str] = None


class UserLogin(BaseModel):
    login: str
    password: str
