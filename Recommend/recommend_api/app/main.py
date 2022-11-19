from fastapi import FastAPI, Depends

from starlette.middleware.cors import CORSMiddleware

import dto, middlepoint, recommend, crud

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/meeplo/recommendation/v1/center")
def get_center_weight(coordinates: dto.CoordinateList):
    return middlepoint.calc_center_weight(coordinates.coordinates)

@app.post("/meeplo/recommendation/v1/amuse")
async def get_keywords(
    tags: dto.TagList
):

    json = {
        "tags": crud.getKeywordsFromDB(recommend.recommend_keywords(tags.tags))
    }

    return json
