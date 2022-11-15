from pydantic import BaseModel

from typing import List

class Coordinate(BaseModel):
    lat: float
    lng: float

class CoordinateList(BaseModel):
    coordinates: List[Coordinate]

class TagList(BaseModel):
    tags: List[str]