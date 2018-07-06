
const config = require("config");
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const Joi = require('joi');
const bcrypt = require("bcrypt");

router.post('/' , async (req , res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send("invalid email or password");

    let user = await User.findOne({email: req.body.email});
    if(!user)  return res.status(400).send("invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password , user.password);
    if(!validPassword) return res.status(400).send("invalid email or password");

    const token = user.generateAuthToken();
    res.send(token);

});

function validate(req){
    const schema = {
        email : Joi.string().required(),
        password : Joi.string().required()
    }
    return Joi.validate(req , schema);
}

module.exports = router;