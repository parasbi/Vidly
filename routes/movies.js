
const express = require('express');
const router = express.Router();
const {Movie} = require('../models/movie');
const {Genre} = require('../models/genre');

router.get('/' , async (req , res) => {
    const movie = await Movie
    .find()
    .select({name : 1})
    res.send(movie);
});

router.post('/' , async (req , res) => {
    const genre = await Genre.findById(req.body.genreId);
    let movie = new Movie({
        title : req.body.title,
       genre : new Genre({
            _id : genre._id,
            name : genre.name
        }),
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
});
movie = await movie.save();
res.send(movie);
});

router.get('/:id' , async (req, res) =>{
    const movie = Movie.findById(req.params.id);
    if(!movie) return;
    res.send(movie);
});

router.put('/:id' , async (req , res) => {
    const movie = Movie.findById(req.params.id);
    if(!movie) return;
    movie.title = req.body.title,
    movie.genre = req.body.genre,
    movie.numberInStock = req.body.numberInStock,
    movie.dailyRentalRate =  req.body.dailyRentalRate
    res.send(movie);
});

router.delete('/:id' , async (req , res) => {
    const result = await Customer.findByIdAndRemove(req.params.id);
    res.send(result);
})
module.exports = router;