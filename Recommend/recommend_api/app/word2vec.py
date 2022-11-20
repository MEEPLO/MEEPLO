from typing import List
import pandas as pd

from tqdm import tqdm

import nlp_util as nlp

from konlpy.tag import Okt
from gensim.models.word2vec import Word2Vec
from gensim.models import KeyedVectors

def train_w2v(tags: List[str]):

    original_data = '../train_data/reviews.txt'
    w2v_model_output = 'meeplo_w2v'

    train_data = pd.read_table(original_data, encoding="cp949")

    train_data['Review'] = train_data['Review'].str.replace("[^ㄱ-ㅎㅏ-ㅣ가-힣 ]","")

    okt = Okt()

    tokenized_data = []

    # tokenizing from data
    for sentence in tqdm(train_data['Review']):
        tokenized_sentence = okt.morphs(sentence, stem=True) # 토큰화
        stopwords_removed_sentence = [word for word in tokenized_sentence if not word in nlp.stopwords] # 불용어 제거
        tokenized_data.append(stopwords_removed_sentence)

    print(tokenized_data)

    # training model from tokenized data
    model = Word2Vec(sentences = tokenized_data, window = 5, min_count = 5, workers = 4, sg = 0)
    model.wv.save_word2vec_format(w2v_model_output)

    # load exist model
    loaded_model = KeyedVectors.load_word2vec_format(w2v_model_output)
    
    for tag in tags:
        try:
            print(loaded_model.most_similar(tag))
        except:
            print('NOT MATCHED')