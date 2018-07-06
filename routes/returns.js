
const express = require('express');
const router = express.Router();
const {Rental} = require("../models/rental");
const auth = require("../middleware/auth");

router.post('/' ,auth ,  async (req , res) => {
    if(!req.body.customerId) return res.status(400).send("Bad request");
    if(!req.body.movieId) return res.status(400).send("Bad request");
    const rental = await Rental.findOne({
        "customer._id" : req.body.customerId,
        "movie._id" : req.body.movieId
    });
    if(!rental) return res.status(404).send("Bad request");
    if(rental.dateReturned) return res.status(400).send("rental already returned")
    rental.movie.numberInStock++;

    return res.status(200).send();

});


module.exports = router;