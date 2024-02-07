const Sequelize = require("sequelize");

const connection = new Sequelize("[DATABASE_NAME]", "[DATABASE_USER]" ,"[USER_PASSWORD]", {
    host : "[HOST]",
    dialect :"[DIALECT_DB]"
});

module.exports = connection;