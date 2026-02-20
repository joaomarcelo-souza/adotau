from typing import Optional
from pydantic import BaseModel


class ReviewBase(BaseModel):
    rating: int
    comment: str
    user_id: int


class ReviewCreate(ReviewBase):
    """Review create schema"""


class ReviewRead(ReviewBase):
    id: int

    class Config:
        from_attributes = True


class ReviewUpdate(BaseModel):
    rating: Optional[int] = None
    comment: Optional[str] = None
