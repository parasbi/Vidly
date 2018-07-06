
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
/*
mongoose.connect('mongodb://localhost/customers')
.then(() => console.log('connecting'))
.catch(() => console.log("could not connect"));

 const customerSchema = new mongoose.Schema({
     isGold : {type : Boolean , required : true},
     name : {type : String , required : true},
     phone_no : {type : Number , required : true}
 });

 const Customer = mongoose.model('Customer' , customerSchema);
 */

 router.get('/', async (req , res) => {
     throw new Error('could not connect');
     const customer = await Customer
     .find()
     .select({name : 1 , isGold : 1 , phone_no : 1});
     res.send(customer);
 });


 router.post('/', async (req , res) => {
     const customer = new Customer({
         isGold : req.body.isGold,
         name : req.body.name,
         phone_no : req.body.phone_no
     });
     const result = await customer.save();
     res.send(result);
 });

 router.get('/:id' , async (req , res) => {
     const customer = await Customer.findById(req.params.id)
     .select({name :1 , isGold : 1 , phone_no : 1});
     res.send(customer);
 });

 router.put('/:id' , async (req , res) => {
      const customer = await Customer.findById(id);
      if(!customer) return;
      customer.name = req.body.name;
      customer.isGold = req.body.isGold;
      customer.phone_no = req.body.phone_no;

      res.send(customer);
 });

 router.delete('/:id' , async (req, res) => {
      const result = await Customer.findByIdAndRemove(req.params.id);
      res.send(result);
 })

module.exports = router;