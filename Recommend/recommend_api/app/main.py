from fastapi import FastAPI

import dto, middlepoint, recommend

app = FastAPI()

@app.post("/meeplo/recommendation/v1/center")
def get_center_weight(coordinates: dto.CoordinateList):
    return middlepoint.calc_center_weight(coordinates.coordinates)

@app.post("/meeplo/recommendation/v1/amuse")
def get_keywords(tags: dto.TagList):
    return recommend.recommend_keywords(tags.tags)
