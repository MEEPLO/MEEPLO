from typing import List

from gensim.models import KeyedVectors
from gensim.models import FastText

import fasttext_util as util

def transform(list):
    return [(util.jamo_to_word(w), r) for (w, r) in list]

def recommend_keywords(tags: List[str]):

    ft_model_fname = 'fasttext/fasttext_model'
    w2v_model_fname = 'word2vec/meeplo_w2v'

    ft_similarity_criteria = 0.9
    w2v_similarity_criteria = 0.65

    loaded_w2v_model = KeyedVectors.load_word2vec_format(w2v_model_fname)

    loaded_fasttext_model = FastText.load(ft_model_fname)

    recommended_words = []
    
    for tag in tags:
        recommended_words.append(tag)
        if tag in loaded_w2v_model.key_to_index:
            for w2v_similar in loaded_w2v_model.most_similar(tag):
                if w2v_similar[0] not in recommended_words and w2v_similar[1] > w2v_similarity_criteria:
                    recommended_words.append(w2v_similar[0])
        
        for fast_similar in transform(loaded_fasttext_model.wv.most_similar(util.jamo_sentence(tag), topn=10)):
            if fast_similar[0] not in recommended_words and fast_similar[1] > ft_similarity_criteria:
                recommended_words.append(fast_similar[0])

    return recommended_words