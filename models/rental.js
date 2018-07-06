
const mongoose = require('mongoose');
const {customerSchema} = require('./customer');
const {movieSchema} = require('./movie');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const rentalSchema = mongoose.Schema({
    noOfDays : {type :Number,
        maxlength : 10
    },
    movie : {
        type : movieSchema,
        required : true
    },
    customer : {
        type : customerSchema,
        required : true
    },
    dateReturned : Date
});

const Rental = mongoose.model("Rental" , rentalSchema);

function validateRental(rental){
    const schema = {
        customerId : Joi.objectId().required(),
        movieId : Joi.objectId().required()
    }
    return Joi.validate(rental , schema)
}
exports.Rental = Rental;
exports.validateRental = validateRental;