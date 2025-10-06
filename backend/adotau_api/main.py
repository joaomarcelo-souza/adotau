"""Main file that creates the API, include the routes and create the database"""

from fastapi import FastAPI
from adotau_api.api.v1.routes import router
from adotau_api.api.v1.user_routes import router as user_router
from adotau_api.api.v1.animal_routes import router as animal_router
from adotau_api.api.v1.review_routes import router as review_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from adotau_api.db.database_config import Base, engine


app = FastAPI(title="Adotau")

origins = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # ou ["*"] para liberar geral
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(router=router)
app.include_router(router=user_router)
app.include_router(router=animal_router)
app.include_router(router=review_router)
