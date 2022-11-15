from typing import List

import re
import urllib.request
import zipfile
# from nltk.tokenize import word_tokenize, sent_tokenize

def recommend_keywords(tags: List[str]):
    json = {
        "tags": tags
    }
    return json