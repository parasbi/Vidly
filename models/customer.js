
const mongoose = require('mongoose');

 const customerSchema = new mongoose.Schema({
     isGold : {type : Boolean , required : true , default : false},
     name : {type : String , required : true},
     phone_no : {type : Number , required : true}
 });

 const Customer = mongoose.model('Customer' , customerSchema);

 exports.Customer = Customer;
 exports.customerSchema = customerSchema;