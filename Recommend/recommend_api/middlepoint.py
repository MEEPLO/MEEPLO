from shapely.geometry import Polygon

def calc_center_weight():

    P = Polygon([[37.564097, 127.052362], [37.5654337, 127.043864], [37.5649304, 127.0524007]])
    print(P.centroid)
    return P.centroid.coords