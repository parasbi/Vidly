
const mongoose = require('mongoose');

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

exports.Genre = Genre;
exports.createGenre = createGenre;
exports.getGenre = getGenre;
exports.updateGenre = updateGenre;
exports.deleteGenre = deleteGenre;
exports.genreSchema = genreSchema;

