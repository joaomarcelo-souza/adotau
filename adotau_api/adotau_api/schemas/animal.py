from typing import Optional
from pydantic import BaseModel


class AnimalBase(BaseModel):
    name: str
    species: str
    sex: str
    age: int
    size: str
    description: str
    city: str
    state: str
    neighborhood: str
    photourl: str


class AnimalCreate(AnimalBase):
    """Animal create schema"""


class AnimalRead(AnimalBase):
    id: int

    class Config:
        orm_mode: True


class AnimalUpdate(BaseModel):

    name: Optional[str] = None
    species: Optional[str] = None
    sex: Optional[str] = None
    age: Optional[int] = None
    size: Optional[str] = None
    description: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    neighborhood: Optional[str] = None
    photourl: Optional[str] = None
