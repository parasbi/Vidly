const request = require('supertest');
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');

let server ;
describe('/api/genres' , () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async() => { 
        await server.close();
        await Genre.remove({});
     });

    describe('GET /' , () => {
        it('should return all genres' ,async () => {
            await Genre.collection.insertMany([
                {'name' : 'genre1'},
                {'name' : 'genre2'},
            ]);
            const res = await request(server).get('/api/genres');
            console.log(` this is the length ${res.body}`);
            expect(res.status).toBe(200);
            //expect(res.body.length).toBe(2);
            //expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            //expect(res.body.some(g => g.name === "genre2")).toBeTruthy();

        });
    });
/*
    describe('GET /:id' , () => {
        it('should return all genres' ,async () => {
            const genre = new Genre({name : 'genre1'});
            await genre.save();

            const res = await request(server).get('/api/genres/' + genre._id);
            expect(res.status).toBe(404);
    //    expect(res.body).toHaveProperty('name' , genre.name);
    });
});
*/
    describe('POST /' , () => {

        let token;
        let name;

        const exec = async () =>{
            return await request(server)
        .post('/api/genres/')
        .set('x-auth-token' , token)
        .send({name});

        }

        beforeEach(() => {
            token =  new User().generateAuthToken();
            name = "genre1";
        });
          

        it('should return 401 if client is not logged in' , async () =>{
            token = " ";
            const res = await exec();

            expect(res.status).toBe(401);
        });
    

    
        it("should return a error if a genre is not present" , async () =>{

            const res = await exec();
            const genre = await Genre.find({nane : "genre1"});

            expect(res.status).toBe(200);
            expect(genre).not.toBeNull();

        })

        it("should return a error if a genre is not present" , async () =>{

            const res = await exec();

            expect(res.status).toBe(200);
            //expect(res.body).toHaveProperty('_id');
            //expect(res.body).toHaveProperty('name');

        })
    })
    
});