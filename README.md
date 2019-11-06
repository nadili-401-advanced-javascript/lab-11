# LAB - 11
AUTH server

## Express

### Author: Nadya Ilinskaya/Seattle-js-401n14

### Links and Resources
* [submission PR](https://github.com/nadili-401-advanced-javascript/lab-11/pull/1)
* [travis](https://travis-ci.com/nadili-401-advanced-javascript/lab-11)
* [heroku](https://nadili-lab-11.herokuapp.com/)


### Modules
#### `app.js`
#### `model.js`
#### `router.js`
#### `middleware.js`
#### `users-model.js`
#### `404.js`
#### `error.js`

#### Quesions

### Setup

#### Running the app
* config .env variables:
    * PORT
    * MONGODB_URI
    * JWT_SECRET
* Make sure use have local version of *app* mongo db with a collection named *users*.
The users collection should have three unique users. Here is the data for these users (note that in the database, the passwords are stored as hashes instead of plain-text):
```
{
    _id: "5db89b394eecc5418a3bf3c1",
    role: "admin",
    username: "sarah",
    password: "sarahpassword",
    email : "sarah@email.com"
}
{
    _id: "5db89b4e4eecc5418a3bf3c2",
    role: "editor",
    username: "bill",
    password: "billpassword",
    email: "bill@email.com"
}
{
    _id: "5db89b624eecc5418a3bf3c3",
    role: "user",
    username: "rene",
    password: "renepassword",
    email : "rene@email.com"
} 
```
* start a MongoDB instance with the data from your local mongo db folder: `mongod --dbpath=./data`
* `node index.js`
* http://localhost:3000

  
#### Tests
* Unit Tests: 'npm test'
* Lint Tests: 'npm run lint' 


#### UML
![ UML](/assets/lab-11-uml.jpg)
