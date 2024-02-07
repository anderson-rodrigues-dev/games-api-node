const express = require('express');
const Router = express.Router();
const Game = require("./Game");
const port = require("../index");

// Middlewares
const auth = require("../middlewares/auth");

// Routes
Router.get("/games", auth, (req, res) => {
    Game.findAll().then(games => {
        res.status(200).json(games);
    }).catch(err => {
        res.status(500).json({error: err});
    });
});

Router.get("/game/:id", auth, (req, res) => {
    let id = req.params.id;
    if(isNaN(id)){
        res.status(400).json({error: "ID is not a number"});
    } else {
        Game.findOne({
            where: {
                id:  req.params.id
            }
        }).then(game => {
            if(!game){
                res.status(404).json({error: "No game found with that ID"});
            } else {
                res.status(200).json(game);
            }
        }).catch(err => {
            res.status(500).json(err);
        });
    }
});

Router.post("/game", auth, (req, res) => {
    var {title, year, price} = req.body;

    if(!title || isNaN(year) || isNaN(price)){
        res.status(400).json({error: "Missing required fields or invalid data type."});
    } else {
        Game.create({
            title: title,
            year: year,
            price: price
        }).then((game) => {
            res.setHeader("location", `/game/${game.id}`);
            res.sendStatus(201);
        }).catch(err => {
            res.status(500).json({error: err});
        })
    }
});

Router.delete( "/game/:id", auth, (req,res)=>{
    const id = req.params.id;
    if(isNaN(id)){
        res.status(400).json({error: "ID is not a number"});
    } else {
        Game.destroy({
            where: {
                id: id
            }
        }).then((game) => {
            if(!game){
                res.status(404).json({error: "No such game exists."});
            } else {
                res.sendStatus(200);
            }
        }).catch(err => {
            res.status(500).json({error: err});
        })
    }
});

Router.put("/game/:id", auth, (req, res) => {
    const {id, title, year, price} = req.body;

    Game.update({
        title: title,
        year: year,
        price: price
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.status(500).json({error: err});
    });
});

module.exports = Router;