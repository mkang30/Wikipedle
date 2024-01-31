from fastapi.testclient import TestClient
import sys
from server import app
from article.articleHandler import ArticleHandler
import random

client = TestClient(app)


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "This is backend for the Wikipedge app"}

def test_article_structure():
    inputTitle = "Odontocera triliturata"
    response = client.get("/article?inputTitle="+inputTitle)
    assert response.status_code == 200
    respJson = response.json()
    assert respJson["result"] == "success"
    assert respJson["content"] != None
    element = respJson["content"][0]
    assert respJson["title"] == inputTitle
    assert len(element["sentences"]) == 2
    assert len(element["similarities"]) == 2


def test_article_error():
    inputTitle = "ahhahahahahahhtsdhshshshshefewjfahwefjewjhghgrhgj"
    response = client.get("/article?inputTitle="+inputTitle)
    assert response.status_code == 200
    respJson = response.json()
    assert respJson["result"] == "error"
    assert respJson["message"] != None

def getMockTitles():
    f = open('./tests/mocklist.txt', 'r')
    lines = f.readlines()
    res = []
    for line in lines:
        res.append(line.strip().replace("_", " "))
    return res

def test_fuzz():
    titles = getMockTitles()
    for i in range(10):
        inputTitle = random.choice(titles)
        response = client.get("/article?inputTitle="+inputTitle)
        assert response.status_code == 200


def test_distance():
    article = "Dog"
    guess = "La Stagione Frankfurt"
    response = client.get("/distance?article="+article+"&guess="+guess)
    respJson = response.json()
    assert respJson["result"] == "success"
    assert type(respJson["distance"]) == int