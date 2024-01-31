# About

Backend API for the Wikipedle app developed using FastAPI

# Running

First install python packages:

    `pip install requirements.txt`

Then execute the command:

    `uvicorn server:app --reload`

in the /backend folder

# Endpoints

The server has 2 main endpoints which are /article and /distance

### Article

request: 1 query parameter -inputTitle- => example: /article?inputTitle=what
if no parameter is provided a random article is chose
response: json with the fields -result-, -title-, -content-

### Distance

request: 2 query parameters -article- and -guess- => example: /distance?article=Dog&guess=Cat
error reponse if no parameter
response: json with the fields -result- and -distance-

### Error
any error is a json reponse with fields -result- ("error") and -message-

Testing

to run the tests use the commands:

`python -m pytest tests/`
