const request = require('supertest');
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');


describe ("authMiddleware" , () => {
    beforeEach(() => { 
        server = require('../../index');
     });
    afterEach(async() => { 
    await server.close();    
    });
    
    let token;
    const exec = () => {
       return  request(server)
        .post('/api/genres/')
        .set('x-auth-token' , token)
        .send(name)
    };
    beforeEach(() => {
        token = new User().generateAuthToken();
    })

    it('should return 401 if token is not present' , async () => {
       
        token = " ";
        const res = await exec();

        expect(res.status).toBe(401);
    });
    
    it("should return a 400 error if token is invalid" , async() => {
        token = "1234";
        const res = await exec();

        expect(res.status).toBe(400);
    });
});