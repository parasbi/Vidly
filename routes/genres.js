
const {Genre , createGenre , getGenre , updateGenre , deleteGenre } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require("../middleware/admin");
/*
mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('connecting to mongodb'))
.catch(() => console.log('could not connect' , err));

const genreSchema = new mongoose.Schema({
    name : {type : String , required : true}
});

const Genre = mongoose.model('Genre' , genreSchema);

async function createGenre(name1){
    const genre = new Genre({
        name : name1
    });    
    try{
        const result = await genre.save();
        console.log(result);
    }
    catch(ex){
        console.log(ex.message);
    }
}

async function getGenre(){
    const genre = await Genre
    .find()
    .select({name : 1 , id : 1})
    console.log(genre);
}


async function updateGenre( id , name){
    const genre = await Genre.findById(id);
    if(!genre) return (console.log('no such genre exists'));
    genre.name = name;
    const result = await genre.save();
    console.log(result);
}

async function deleteGenre(id){
    const result = await Genre.deleteOne({_id : id});
    console.log(result);

}
*/


router.get('/' , async(req, res) => {
    res.send(getGenre());
});

router.post('/' , auth , async (req,res) => {

    
    //validate the input
    //const {error} = validateGenre(req.body);
    //if(error) return res.status(404).send("genre is required");
    res.send(createGenre(req.body.name));
})

router.put('/:id' , async (req, res) =>{
    /*const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send('Bad request');

    const {error} = validateGenre(req.body);
    if(error) return res.status(404).send("genre is required");
    
    genre.name = req.body.name;
    res.send(genre);*/
    res.send(updateGenre(req.params.id , req.body.name));
})
router.delete('/:id' ,[auth , admin] , async (req , res)=> {
    /*const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send('Bad request');
 
    const {error} = validateGenre(req.body);
    if(error) return res.status(404).send("genre is required");
    
    const index = genres.indexOf(genre);
    genres.splice(index ,1);
    res.send(genre);*/
    res.send(deleteGenre(req.params.id));
})

/*function validateGenre(genre){
    const schema = {
        name : Joi.required() 
    }
    const result = Joi.validate(genre , schema);
    return result;
}*/

module.exports = router;