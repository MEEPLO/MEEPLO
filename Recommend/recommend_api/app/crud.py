from typing import List

import pandas as pd
import database

def getKeywordsFromDB(tags: List[str]):

    quoted_tags = []
    for tag in tags:
        quoted_tags.append("\"" + tag + "\"")
    
    sql = "select distinct lk.keyword from location_keyword lk where lk.keyword regexp \"{}\"".format("|".join(tags))

    db_keywords = []

    for result in pd.read_sql(sql, database.engine)["keyword"]:
        db_keywords.append(result)

    return db_keywords

