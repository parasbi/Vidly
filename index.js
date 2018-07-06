
const express = require('express');
const winston = require('winston');
const app = express();
require("./statups/logging")();
require("./statups/routes")(app);
require("./statups/config")();
require("./statups/validation")();
require("./statups/db")(); 
require("./statups/prod")(app);

app.get('/' , (req, res)=>{
    res.send("hello this is vidly- a movie renting app");
})

const port = process.env.PORT || 3000;
const server = app.listen(port , () => winston.info(`Listening on port ${port}`));

module.exports = server;