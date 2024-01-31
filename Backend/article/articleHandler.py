import urllib.parse as up
import requests
from bs4 import BeautifulSoup, Tag
from .sentenceSimilarity import similarity_calc
import sys
from sentence_transformers import SentenceTransformer,util
sys.path.append('../backend')
from utilities.responseBuilders import *
from handler import Handler
from parser.wikipediaParser import WikipediaParser

"""
This class represents the handler for the
/article endpoint of the app
"""

class ArticleHandler(Handler):
    def __init__(self):
        # nlp model for sentence similarity analysis with pretrined weights
        self.model = SentenceTransformer('paraphrase-MiniLM-L6-v2')  

    """
    This function handles the endpoint request
    to the /article. 
    args: dictionary containing inputTitle
    returns: json response that represents a 
    Wikipedia article plaintext
    """
    def handle(self,args:dict)->dict:

        if "inputTitle" not in args:
            return errorBuild("Arguments to ArticleHandler must include inputTitle")
        try:
            parser = WikipediaParser(args["inputTitle"])
            return pageBuild(title=parser.wikiTitle,content=parser.parse(self.textElementCFE))
        except Exception as e:
            return errorBuild(e.args[0]) 
        
    """
    Creator method that is passed to parse method as an argument.
    Builds textElement from a BS4 element.
    wikiTitle: self-explnatory
    element: BS4 Tag element
    returns: textElement dict
    exception: if wikiTitle is None, element is not BS4 Tag
    """
    def textElementCFE(self,wikiTitle:str,element)->dict:
        if not wikiTitle:
            raise Exception("wikiTitle can't be None")
        if type(element) != Tag:
            raise Exception("Argument element should be BS4 Tag type")
        tag = element.name
        text = element.text.strip()
        if tag == 'p':
            text = ""
            for e in element:
                    text += e.text.replace("\n"," ")
        if text.strip() == "":
            return None
        sentences = text.split('.')
        similarities = similarity_calc(self.model,wikiTitle,sentences)
        textElement = textElementBuild(sentences,tag,similarities)
        return textElement
            

