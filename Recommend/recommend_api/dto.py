from pydantic import BaseModel

from typing import List

class Coordinate(BaseModel):
    lat: float
    lng: float

    class Config:
        orm_mode = True

class CoordinateList(BaseModel):
    coordinates: List[Coordinate]