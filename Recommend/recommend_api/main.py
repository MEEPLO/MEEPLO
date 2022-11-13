from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

import dto, middlepoint

app = FastAPI()


class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}

@app.post("/meeplo/recommendation/v1")
async def get_center_weight(coordinates: dto.CoordinateList):
    return middlepoint.calc_center_weight()
    # return coordinates.coordinates