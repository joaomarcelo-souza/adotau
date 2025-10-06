# adotau_api/crud/review.py

from sqlalchemy.orm import Session
from adotau_api.schemas.review import ReviewCreate, ReviewUpdate
from adotau_api.models.review import Review


def create_review(db: Session, review_data: ReviewCreate):
    """Creates a review on database"""

    review = Review(**review_data.model_dump())
    db.add(review)
    db.commit()
    db.refresh(review)

    return review


def get_all_reviews(db: Session):
    """Gets all reviews from database"""

    return db.query(Review).all()


def get_review(db: Session, review_id: int):
    """Gets a review with its id from database"""

    return db.query(Review).filter(Review.id == review_id).first()


def update_review(db: Session, review_id: int, review_data: ReviewUpdate):
    """Updates a review with its id on database"""

    review = get_review(db, review_id)

    if review:
        for field, value in review_data.model_dump(exclude_unset=True).items():
            setattr(review, field, value)

        db.commit()
        db.refresh(review)

    return review


def delete_review(db: Session, review_id: int):
    """Deletes a review with its id on database"""

    review = get_review(db, review_id)

    if review:
        db.delete(review)
        db.commit()

    return review
