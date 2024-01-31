from sentence_transformers import SentenceTransformer,util
import torch.nn.functional as f
import numpy as np
import requests as req
import copy


"""
Calculates the similarity score of the sentences
to the given title.
title: self-explanatory
sentences: a list of sentences to be analyzed
returns: list of floats
"""
def similarity_calc(model, title:str, sentences:list)->list:
    if not model:
        raise Exception("model can't be None")
    if not title:
        raise Exception("title can't be None")
    if not sentences:
        raise Exception("sentences can't be None or empty")
    title = model.encode(title,convert_to_tensor=True)
    encodings = [(model.encode(x,convert_to_tensor=True)) for x in sentences]
    similarities = []
    for encoding in encodings:
        output = util.pytorch_cos_sim(title,encoding)
        similarities.append(float(output.numpy()[0]))
    return copy.deepcopy(similarities)