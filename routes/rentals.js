
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Fawn = require('fawn');
const {Rental , validateRental} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');


Fawn.init(mongoose);

router.get('/' , async (req , res) => {
    const rental = await Rental
    .find()
    .select('movie' , 'customer');

    res.send(rental);
});

router.post('/' , async (req , res) => {
    const {error} = validateRental(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Bad request");

    const rental = new Rental({
        noOfDays : req.body.noOfDays,
        movie : new Movie({
            _id : movie._id,
            title : movie.title
        }),
        
        customer : new Customer({
            _id : customer._id,
            name : customer.name,
            phone_no : customer.phone_no,
            isGold : customer.isGold
        })
    });
    try{
    new Fawn.task()
    .save('rentals' , rental)
    .update('movies' ,{_id : movie._id} , {
        $inc: { numberInStock : -1}
    })
    .run();

    res.send(rental);
}
catch(ex){
    res.status(500).send("something failed")
}
    });


router.get('/:id' , async (req , res) => {
    const rental = await Rental.findById(req.params.id);
    if(!rental) return;
    res.send(rental);
});

router.put('/:id' , async (req , res) => {
    const rental = await Rental.findById(req.params.id);
    if(!rental) return;
    rental.noOfDays = noOfDays;
    res.send(rental)
});

router.delete('/:id' , async (req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id);
    if(!rental) return;
    res.send(rental);
})
module.exports = router;

