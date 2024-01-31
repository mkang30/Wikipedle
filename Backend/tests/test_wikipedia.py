import pytest
import sys
from article.articleHandler import ArticleHandler
from parser.wikipediaParser import WikipediaParser

article1 = WikipediaParser("Snake Creek Recreation Area", mocking=True)
article2 = WikipediaParser("Odontocera triliturata", mocking=True)
def creatorText(title, element):
    return element.text.strip()

def testArticleNotFound():
    with pytest.raises(Exception):
        WikipediaParser("pagenotfoundthsfeefef")
        WikipediaParser("fefefefefefefefef")
        WikipediaParser("nonexistentwhatever")

def testInvalidConstructorArguments(): 
    with pytest.raises(Exception):
        WikipediaParser("")
        WikipediaParser(None)

def testTitleCorrespondence():
    assert article2.wikiTitle == "Odontocera triliturata"
    assert article1.wikiTitle == "Snake Creek Recreation Area"

def testInvalidParseArguments():
    with pytest.raises(Exception):
        article1.parse(None)
        article1.parse(lambda x: x)
        article2.parse("fffff")

def testParseWithTextCreator():
    textContent = article2.parse(creator=creatorText)
    assert textContent[0] == "Odontocera triliturata is a species of beetle in the family Cerambycidae.[1]"

def testParseWithTextElementCreator():
    handler = ArticleHandler()
    content = article2.parse(handler.textElementCFE)
    assert len(content) == 1
    p1 = content[0]
    assert p1["tag"] == "p"
    assert len(p1["sentences"]) == 2
    assert len(p1["similarities"]) == 2
    assert p1["sentences"][0] == "Odontocera triliturata is a species of beetle in the family Cerambycidae"
    
    