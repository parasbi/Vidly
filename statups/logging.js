
const winston = require('winston');
require('express-async-errors');
//require('winston-mongodb');


module.exports = function() { 
    winston.handleExceptions(
        new winston.transports.Console({colorize : true , prettyPrint : true}),
        new winston.transports.File({filename : "uncaught_exception.log"}))

    process.on('unhandledRejection' , (ex) =>{
    winston.error(ex.message ,err);
    process.exit(1);

    winston.add(winston.transports.File , {filename: 'logfile.log'});
    //winston.add(winston.transports.MongoDB , {db : 'mongodb://localhost/vidly'});

})

}
