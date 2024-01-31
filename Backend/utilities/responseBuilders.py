
"""
Returns a json(dict) that represetns an error
response with the structure
{
    result: error
    message: str
}
"""
def errorBuild(msg:str) -> dict:
    return {"result": "error", "message": msg}

"""
Returns a json(dict) that represents a wikipedia
page with the following strcuture
{
    result: str (success or error)
    title: str
    content: list (of sentences)
    similarities: list (of similarity scores)
}
"""
def pageBuild(title:str, content:list)->dict:
    if not title:
        raise Exception("title can't be None")
    res = dict()
    res["result"] = "success"
    res["title"] = title 
    res["content"] = content
    return res


"""
Returns a dictionary that represents a sentence
in the article that has folowing structure
{
    sentences: list[str]
    tag: str (e.g p, h1, h2, etc )
    similarities: list[number]
}
"""
def textElementBuild(sentences:list, tag:str, similarities: list) -> dict:
    if not tag:
        raise Exception("title can't be None")
    res = {"sentences":sentences, "tag":tag, "similarities":similarities}
    return res