const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());


const genres = [
    {id :1 ,
    name : "action"
    }
]

app.get('/' , (req , res)=>{
    res.send("hello this is vidly- a movie renting app");
})
app.get('/api/genres' , (req , res) => {
    res.send(genres);
})
app.post('/api/genres' , (req,res) => {

    //validate the input
    const {error} = validateGenre(req.body);
    if(error) return res.status(404).send("genre is required");

    const genre = {
        id : genres.length + 1 ,
        name : req.body.name
    }
    genres.push(genre);
    res.send(genre);
})
app.put('/api/genres/:id' , (req, res) =>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send('Bad request');

    const {error} = validateGenre(req.body);
    if(error) return res.status(404).send("genre is required");
    
    genre.name = req.body.name;
    res.send(genre);
})
app.delete('/api/genres/:id' , (req , res)=> {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send('Bad request');
 
    const {error} = validateGenre(req.body);
    if(error) return res.status(404).send("genre is required");
    
    const index = genres.indexOf(genre);
    genres.splice(index ,1);
    res.send(genre);
     
})

function validateGenre(genre){
    const schema = {
        name : Joi.required() 
    }
    const result = Joi.validate(genre , schema);
    return result;
}

const port = process.env.PORT || 3000;
app.listen(port , () => (`Listening on port ${port}`));