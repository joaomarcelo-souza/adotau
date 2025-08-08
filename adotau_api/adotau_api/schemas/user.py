from typing import List, Optional
from pydantic import BaseModel, EmailStr
from adotau_api.schemas.animal import AnimalRead


class UserBase(BaseModel):
    name: str
    last_name: str
    email: EmailStr
    city: str
    state: str
    neighborhood: str
    type_user: str
    isdonor: bool
    photourl: str
    phone: str
    password: str
    isactive: bool


class UserCreate(UserBase):
    """User create schema"""


class UserRead(UserBase):
    id: int
    animals: List[AnimalRead] = []

    class Config:
        orm_mode = True


class UserUpdate(BaseModel):

    name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    city: Optional[str] = None
    state: Optional[str] = None
    neighborhood: Optional[str] = None
    type_user: Optional[str] = None
    isdonor: Optional[bool] = None
    photourl: Optional[str] = None
    phone: Optional[str] = None
    isactive: Optional[bool] = None
