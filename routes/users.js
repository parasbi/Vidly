
const config = require("config");
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const {User , validateUser} = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require('../middleware/auth');


router.get('/me' , auth , async (req , res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
})

router.get('/', async (req , res) =>{
    const user = await User
    .find()
    .select()
    res.send(user);
});

router.post('/' , async (req , res) => {
    const {error} = validateUser(req.body);
    if(error) return res.send(400).send(error.details[0].message);

    const user = new User(_.pick(req.body , ['name' , 'email' , 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password , salt);
    await user.save();
    const token = user.generateAuthToken();

    res.header('x-auth-token' , token).send(_.pick(user , ['name' , 'email']));

});

router.get('/:id' , async (req ,res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(400).send("wrong id");

    res.send(user);
});

router.put("/:id" , async (req , res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(400).send("wrong id");

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    res.send(user);

});

router.delete('/:id' , async (req , res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    res.send(user);
})

module.exports = router;