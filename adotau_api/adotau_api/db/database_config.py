from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session, DeclarativeBase

DATABASE_URL = "sqlit:///./adotau.db"

engine = create_engine(
    DATABASE_URL, echo=True, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


def get_db():
    """Get the database session"""

    db: Session = SessionLocal()

    try:
        yield db

    finally:
        db.close()


class Base(DeclarativeBase):
    """Class that extends the DeclarativeBase from sqlalchemy"""
