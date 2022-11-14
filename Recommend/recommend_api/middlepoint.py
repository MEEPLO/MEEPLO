from shapely.geometry import Polygon
from typing import List

import dto

def calc_center_weight(coordinates: List[dto.Coordinate]):
    if len(coordinates) == 1:
        return coordinates[0]

    if len(coordinates) == 2:
        return {"lat": (coordinates[0].lat + coordinates[1].lat) / 2, "lng": (coordinates[0].lng + coordinates[1].lng) / 2}

    rows = len(coordinates)
    cols = 2
    coordArray = [[0 for j in range(cols)] for i in range(rows)]

    for i in range(rows):
        coordArray[i][0] = coordinates[i].lat
        coordArray[i][1] = coordinates[i].lng

    P = Polygon(coordArray)

    json = {
        "lat": P.centroid.x,
        "lng": P.centroid.y
    }

    return json