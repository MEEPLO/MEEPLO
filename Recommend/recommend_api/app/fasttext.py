import fasttext_util as util
from tqdm import tqdm

import logging

import re

import nlp_util as nlp

from gensim.models import FastText
from konlpy.tag import Okt

def process_jamo(tokenized_corpus_fname, output_fname):
    total_lines = sum(1 for line in open(tokenized_corpus_fname, 'r', encoding='cp949'))

    okt = Okt()

    with open(tokenized_corpus_fname, 'r', encoding='cp949') as f1, \
            open(output_fname, 'w', encoding='cp949') as f2:

        for _1, line in tqdm(enumerate(f1), total=total_lines):
            sentence = re.sub("[^ㄱ-ㅎㅏ-ㅣ가-힣 ]", "", line).strip()

            tokenized_sentence = okt.morphs(okt.normalize(sentence), stem=True) # 토큰화
            stopwords_removed_sentence = [word for word in tokenized_sentence if not word in nlp.stopwords]

            processed_sentence = util.jamo_sentence(' '.join(stopwords_removed_sentence))
            f2.writelines(processed_sentence + '\n')

def modeling_fasttext():
    tokenized_corpus_fname = 'models/train_data/reviews.txt'
    output_fname = 'models/train_data/review_corpus.txt'

    process_jamo(tokenized_corpus_fname, output_fname)

    model_fname = 'fasttext_model'

    logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

    # generating corpus
    corpus = [sent.strip().split(" ") for sent in tqdm(open(output_fname, 'r', encoding='cp949').readlines())]

    # modeling FastText
    model = FastText(corpus, window=5, min_count=5, workers=4, sg=1)
    model.save(model_fname)

    print(f"학습 소요 시간 : {model.total_train_time}")

    # https://projector.tensorflow.org/ 에서 시각화 하기 위해 따로 저장
    model.wv.save_word2vec_format(model_fname + "_vis")

    # load exist model
    # loaded_model = FastText.load(model_fname)