# Games API in Node.js
API in Node.js for game management with authentication via JWT.
Welcome to the repository of the Games API developed in Node.js! This powerful API provides a comprehensive solution for managing game-related information, offering a complete set of CRUD (Create, Read, Update, Delete) operations. Additionally, it integrates a robust authentication system using JWT (JSON Web Tokens) to ensure the security of operations and data.

## Key Features
### Complete CRUD Operations
The API enables full management of game information, from creation to deletion, providing an efficient data management experience.
### JWT Authentication
Utilizes JSON Web Tokens to authenticate users registered in the system. This ensures the security of operations, allowing only authorized access to protected API routes.

## Endpoints
### GET /games
This endpoint is responsible for returning a list of all Games registered in the database.
#### Parameters
None
#### Responses
##### OK 200
If this response is returned, you will receive a list of all games.
Response example:
```
[
    {
        "id": 2,
        "title": "GTA VI",
        "year": 2024,
        "price": "250.00"
    },
    {
        "id": 23,
        "title": "Call of duty MW",
        "year": 2019,
        "price": "60.00"
    },
    {
        "id": 65,
        "title": "Seaf od thieves",
        "year": 2018,
        "price": "40.00"
    }
]
```
##### Unauthorized 401
If this response is returned, it means that something failed during the request authentication process. Reasons: Invalid token or expired token.
Response example:
```
Unauthorized
```
##### Internal Server Error 500
Indicates that an internal error has occurred. Reasons: Processing error or unhandled exceptions.

### GET /game/:id
This endpoint is responsible for returning a single game registered in the database by ID.
#### Parameters
None
#### Responses
##### OK 200
If this response is returned, you will receive a game with the same ID passed as a parameter.
Response example:
```
{
    "id": 2,
    "title": "GTA V",
    "year": 2013,
    "price": "250.00"
}
```
##### Bad Request 400
If this response is returned, it means that the parameter is not valid. Reasons: ID passed as a parameter is not a number.
Response example:
```
{
    "error": "ID is not a number"
}
```
##### Unauthorized 401
If this response is returned, it means that something failed during the request authentication process. Reasons: Invalid token or expired token.
Response example:
```
Unauthorized
```
##### Not Found 404
If this response is returned, it means the game was not found.
Response example:
```
{
    "error": "No game found with that ID"
}
```
##### Internal Server Error 500
Indicates that an internal error has occurred. Reasons: Processing error or unhandled exceptions.

### POST /game
This endpoint is responsible for creating games in the database.
#### Parameters
title: Game name to be added.
year: Game year to be added.
price: Game price to be added.
Example:
```
{
    "title": "GTA VI",
    "year": 2024,
    "price": 250
}
```
#### Responses
##### CREATED 201
If this response is returned, it means the game has been created. A "location" header is returned with the address of the created game.
Header example:
```
{
    "location": "/game/72"
}
```
##### Bad Request 400
If this response is returned, it means the parameters are not valid. Reasons: Missing required fields or invalid data type.
##### Unauthorized 401
If this response is returned, it means that something failed during the request authentication process. Reasons: Invalid token or expired token.
Response example:
```
Unauthorized
```
##### Internal Server Error 500
Indicates that an internal error has occurred. Reasons: Processing error or unhandled exceptions.

### DELETE /game/:id
This endpoint is responsible for deleting a game in the database by ID.
#### Parameters
None
#### Responses
##### OK 200
If this response is returned, it means the game has been deleted.
##### Bad Request 400
If this response is returned, it means that the parameter is not valid. Reasons: ID passed as a parameter is not a number.
Response example:
```
{
    "error": "ID is not a number"
}
```
##### Not Found 404
If this response is returned, it means the game was not found.
Response example:
```
{
    "error": "No game found with that ID"
}
```
##### Unauthorized 401
If this response is returned, it means that something failed during the request authentication process. Reasons: Invalid token or expired token.
Response example:
```
Unauthorized
```
##### Internal Server Error 500
Indicates that an internal error has occurred. Reasons: Processing error or unhandled exceptions.
### PUT /game/:id
This endpoint is responsible for editing a game in the database by ID.
#### Parameters
None
#### Responses
##### OK 200
If this response is returned, it means the game has been changed.
##### Unauthorized 401
If this response is returned, it means that something failed during the request authentication process. Reasons: Invalid token or expired token.
Response example:
```
Unauthorized
```
##### Internal Server Error 500
Indicates that an internal error has occurred. Reasons: Processing error or unhandled exceptions.

### POST /user
This endpoint is responsible for creating users in the database.
#### Parameters
name: User name to be registered in the database.
email: User email to be registered in the database.
password: User password to be registered in the database.
Example:
```
{
    "name":"Anderson Rodrigues",
    "email":"anderson.rod.dev@gmail.com",
    "password":"1234567890"
}
```
#### Responses
##### CREATED 201
If this response is returned, it means the user has been created.
##### Bad Request 400
If this response is returned, it means the parameters are not valid. Reason: Missing required fields.
Response example:
```
{
    "error": "Missing required fields"
}
```
##### Conflict 409
If this response is returned, it means that the request has conflicted with the server. Reason: Email parameter already exists in the database.
Response example:
```
{
    "error": "E-mail already in use"
}
```
##### Internal Server Error 500
Indicates that an internal error has occurred. Reasons: Processing error or unhandled exceptions.
### POST /auth
This endpoint is responsible for authenticating the user, carrying out the login process and returning a token to allow authorization in other requests.
#### Parameters
email: Email of the user registered in the system.
password: Password of the user registered in the system.
Example:
```
{
    "email":"anderson.rod.dev@gmail.com",
    "password":"1234567890"
}
```
#### Responses
##### OK 200
If this response is returned, it means that the user was authenticated and a token was generated for access to other requests.
Response example:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmQucnRAaG90bWFpbC5jb20iLCJpYXQiOjE3MDczMzUyMjgsImV4cCI6MTcwNzUwODAyOH0.Ga5xpQKBKL0DUi8E75PYbJA3Bi5p-5uwGGeg3_v2c9g"
}
```
##### Unauthorized 401
If this response is returned, it means that something failed during the request authentication process. Reasons: incorrect password.
Response example:
```
Unauthorized
```
##### Not Found 404
If this response is returned, it means the user was not found.
Response example:
```
{
    "error": "User not found"
}
```
##### Internal Server Error 500
Indicates that an internal error has occurred. Reasons: Processing error or unhandled exceptions.
