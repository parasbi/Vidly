
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require("config");

const userSchema = mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , unique : true},
    password : {type : String , required : true},
    isAdmin : Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id : this._id , isAdmin: this.isAdmin} , config.get('jwtPrivateKey'));
    return token;
}

const User =  mongoose.model("User" , userSchema);

function validateUser(user){
    const schema = {
        name : Joi.string().required(),
        email : Joi.string().required(),
        password : Joi.string().required()
    }
    return Joi.validate(user , schema);
}
exports.User = User;
exports.validateUser = validateUser;