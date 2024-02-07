const express = require("express");
const app = express();
const Game = require("./games/Game");
const port = 8080;
const bodyParser = require("body-parser");

// CORS
const cors = require ("cors");
app.use(cors());

// Body-Parser
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());

// User Controller
const usersController = require('./users/usersController');
app.use("/", usersController);

// Game Controller
const gamesController = require("./games/gamesController");
app.use('/', gamesController);

// Middlewares
const auth = require("./middlewares/auth");

// Routes

//Listen
app.listen(port, () => {
    console.log("API Rodando..");
});

module.exports = port;