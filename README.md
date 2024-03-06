# Social-Network-API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
Taking advantage of MongoDB usage, we have created this Social Network API as a backend Web Application in which users can share their thoughts by user, react to them and by their desire, add some friends to those lists as well. All the functionality belongs to backend purposes, so that, everything will be tested through CLI and Insomnia.

## Table of Contents:
- [The Challenge](#Challenges-Faced)
- [Usage Information](#Usage-Information)
- [Installation Process](#Installation-Process)
- [Built With](#Built-With)
- [License](#License)
- [Author](#Author)

## Challenges Faced
Getting used to MongoDB database structure and understanding how NoSQL Databases work, as well as seeding the database for testing purposes.

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Usage Information
Above there are some instructions about how the Installation process will be in order to run the application, but what does exactly our application does and why would we need it?
As developers we sometimes run with the need of counting with an API for which we can add some database on it and play with it, this BackEnd NoSQL Application allows us to store and count with a CRUD functionality on it.

## Installation Process

1. Clone the repository created on Github on your VSC code to start working on it.
2. Since package.json is already in there, make sure to run through CLI `npm i` to install all the dependencies.
3. Run `npm run seed` to make sure database example is correctly being seeded.
4. Run `npm start` to start your application. A message of `running in PORT 3001` must be displayed on your terminal.
5. Open Insomnia and test the routes! You're ready to go.

## Built With

1. Visual Studio Code as a Code Editor.
2. Node JS.
3. Express JS to start the application in the server.
4. MongoDB and Mongoose for database.
5. Nodemon to run the application.

## Mock Up
[Walkthrough Video](https://drive.google.com/file/d/1RuE5ANQ3JJwsZJVDcEPDKkUVS6CxLp7A/view?usp=sharing)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Author

Maria Angulo.
[Github](https://github.com/maferadr)