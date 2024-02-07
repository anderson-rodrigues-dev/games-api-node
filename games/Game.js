const Sequelize = require("sequelize");
const connection = require("../database/database");

const Game = connection.define("games", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false
});

// Game.sync({force: false});

module.exports = Game;