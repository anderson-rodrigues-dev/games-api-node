const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../users/jwt_secret");

function auth(req, res, next){
    const authToken = req.headers['authorization'];

    if(!authToken){
        return res.sendStatus(401);
    } else {
        const bearer = authToken.split(" ");
        const token = bearer[1];

        jwt.verify(token, JWT_SECRET, (err, data) => {
            if(err){
                res.sendStatus(401);
            } else {
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        })
    }
}

module.exports = auth;