from bs4 import BeautifulSoup
from .parser import Parser
import requests
from .mockPages import articles
"""
This class represents a wikipedia parser
"""
class WikipediaParser(Parser):
    """
    Make request to the Wikipedia page and webscrape its content
    as a BeautifulSoup instance
    inputTitle: self-explanatory
    Exception: if inputTitle is None, connection failed, no page exists
    """
    def __init__(self, inputTitle:str, mocking = False):
        if not inputTitle:
            raise Exception("inputTitle can't be None")
        url = "https://en.wikipedia.org/wiki/"+inputTitle
        if not mocking:
            response = requests.get(url=url)
            self.soup = BeautifulSoup(response.content, 'html.parser')
            #check the validity of page 1. connection failure 2. wikipedia page doest not exist
            if response.status_code != 200:
                raise Exception("Failed to connect to wikipedia.com. Error code "+str(response.status_code)) 
            if self.soup.find_all(lambda x: x.text == "Wikipedia does not have an article with this exact name."):
                raise Exception("No article found with the title "+inputTitle)
        else:
            self.soup = BeautifulSoup(articles[inputTitle], 'html.parser')
        self.wikiTitle = self.soup.find(id="firstHeading").text

    """
    Takes in the creator function that must take a
    BeautifulSoup element as an argument and output a parsed
    instance of that element.
    creator: funtion that takes in a BS element as an argument
    returns: list of created objects
    Exception: if creator function fails
    """
    def parse(self, creator)->list:
        bodyElements = self.soup.find("div", {"id":"mw-content-text"}).find_all(lambda x: x.name=="p" or x.name=="h2" or x.name=="h3")
        content = []
        for element in bodyElements:
            if element.name == "h2" and "References" in element.text:
                break
            res = creator(self.wikiTitle,element)
            if res:
                content.append(res)
        print(content)
        return content
