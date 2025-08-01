"""Main file that creates the API, include the routes and create the database"""

from fastapi import FastAPI
from adotau_api.api.v1.routes import router
from adotau_api.db.database_config import Base, engine


app = FastAPI(title="Adotau")

Base.metadata.create_all(bind=engine)

app.include_router(router=router)
