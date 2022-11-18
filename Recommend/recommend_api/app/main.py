from fastapi import FastAPI, Depends

# from fastapi import HTTPException, responses, Query
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware

import dto, middlepoint, recommend, model, database, schema

app = FastAPI()

model.Base.metadata.create_all(bind=database.engine)

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

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/meeplo/recommendation/v1/center")
def get_center_weight(coordinates: dto.CoordinateList):
    return middlepoint.calc_center_weight(coordinates.coordinates)

@app.post("/meeplo/recommendation/v1/amuse")
async def get_keywords(
    tags: dto.TagList, 
    db: Session = Depends(get_db)
):

    json = {
        "tags": recommend.recommend_keywords(tags.tags)
    }

    return json
