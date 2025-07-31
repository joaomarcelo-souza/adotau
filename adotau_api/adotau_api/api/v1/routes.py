"""Base routes of API"""

from fastapi import APIRouter

router = APIRouter(prefix="/v1/base", tags=["Base"])


@router.get("/hello")
def hello_world() -> str:
    """Route that gets a string "Hello World" """
    return "Hello World"
