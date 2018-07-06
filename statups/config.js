
const config = require('config');

module.exports = function(){
    if(!config.get('jwtPrivateKey')){
        return console.error("FATAL ERROR: jwtPrivateKey is not defined");
        process.exit(1);
    }
    
}