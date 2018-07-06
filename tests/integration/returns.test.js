
const {User} = require("../../models/user");
const {Rental} = require("../../models/rental");
const mongoose = require('mongoose');
const request = require("supertest");

describe("/api/returns" , () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    beforeEach(async () => {
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();

        server = require('../../index');
         rental = new Rental({
            customer: {
                _id : customerId,
                name : '12345',
                phone_no: '12345'
            },
            movie : {
                _id : movieId,
                titile : '12345',
                dailyRentalRate : 2
            }
        });
        await rental.save();
    });
    afterEach(async() => {
        server.close();
        await Rental.remove();
    })
    it('should return 400 if client is not logged in!' , async () => {
        const res =await request(server)
        .post("/api/returns")
        .send({customerId , movieId});

        expect(res.status ).toBe(401);
    });
    it('should 400 if customerId is not provided' , async () => {
        const token = new User().generateAuthToken();
        const res = await request(server)
        .post("/api/returns")
        .set('x-auth-token' , token)
        .send({movieId});

        expect(res.status).toBe(400);
    })
    it('should 404 if no rental is found' , async () => {
        await Rental.remove();
        const token = new User().generateAuthToken();
        const res = await request(server)
        .post("/api/returns")
        .set('x-auth-token' , token)
        .send({customerId , movieId});

        expect(res.status).toBe(404);
    });/*
    it('should 400 if customerId is not provided' , async () => {
        const token = new User().generateAuthToken();
        rental.dateReturned = new Date();
        await rental.save();
        const res = await request(server)
        .post("/api/returns")
        .set('x-auth-token' , token)
        .send({customerId , movieId});

        expect(res.status).toBe(400);
    });
*/
    it('should 200 if valid request' , async () => {
        const token = new User().generateAuthToken();
        await rental.save();
        const res = await request(server)
        .post("/api/returns")
        .set('x-auth-token' , token)
        .send({customerId , movieId});

        expect(res.status).toBe(200);
    });


})