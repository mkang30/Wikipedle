from fastapi import FastAPI
from article.articleHandler import ArticleHandler
from distance.distanceHandler import DistanceHandler
from utilities.responseBuilders import errorBuild
from fastapi.responses import JSONResponse

"""
This module sets up and starts the server
"""

#server instance
app = FastAPI()
articleHandler = ArticleHandler()
distanceHandler = DistanceHandler()

@app.get("/")
def root():
    return {"message": "This is backend for the Wikipedge app"}

@app.get("/article")
def article(inputTitle:str = "Special:Random"):
    content = articleHandler.handle({"inputTitle":inputTitle})
    headers = {'Access-Control-Allow-Origin':'*' }
    return JSONResponse(content=content, headers=headers)

@app.get("/distance")
def distance(article= "",guess=""):
    if not article:
        return errorBuild("Query parameter -article- should be specified")
    if not guess:
        return errorBuild("Query parameter -guess- should be specified")
    content = distanceHandler.handle({"article":article,"guess":guess})
    headers = {'Access-Control-Allow-Origin': '*'}
    return JSONResponse(content=content, headers=headers)

