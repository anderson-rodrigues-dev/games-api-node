const express = require('express');
const Router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

// JWT
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../users/jwt_secret");

// Middlewares
const auth = require("../middlewares/auth");

// Routes
Router.post("/user", (req, res) => {
    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    if(!userName || !userEmail || !userPassword){
        res.status(400).json( {error: "Missing required fields"} );
    } else {
        User.findOne({
            where: {
                email: userEmail
            }
        }).then(user => {
            if(!user){
                const salt = bcrypt.genSaltSync(10);
                const userPasswordHash = bcrypt.hashSync(userPassword, salt);
                User.create({
                    name: userName,
                    email: userEmail,
                    password: userPasswordHash
                }).then(() => {
                    res.sendStatus(201);
                }).catch(err => {
                    throw err;
                })
            } else {
                res.status(409).json({error: 'E-mail already in use'});
            }
        }).catch(err => {
            res.status(500).json({error: err});
        })
        
    }
});

Router.post("/auth", (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    if(!userEmail || !userPassword){
        res.status(400).json({error: "Missing fields"});
    } else {
        User.findOne({
            where: {
                email: userEmail
            }
        }).then(user => {
            if(!user){
                res.status(404).json({error: "User not found"});
            } else if(!bcrypt.compareSync(userPassword, user.password)){
                res.status(401).json({error: "Invalid credentials"});
            } else {
                jwt.sign({
                    id: user.id, 
                    email: user.email
                }, JWT_SECRET, {expiresIn: "48h"}, (err, token) => {
                    if(err){
                        throw err;
                    } else {
                        res.status(200).json({token: token});
                    }
                })
            }
        }).catch(err => {
            res.status(500).json({error: err});
        });
    }
})

module.exports = Router;
