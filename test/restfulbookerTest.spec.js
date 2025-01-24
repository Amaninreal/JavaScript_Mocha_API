const { bookingClient, userAuthData } = require('../utils/apiClient');
const expect = require('chai').expect;
const { faker } = require('@faker-js/faker');

describe('Booking Restful API Tests', () => {
    let bookingId;
    let token;
    
    const generateBookingData = () => ({
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: faker.number.int({ min: 50, max: 1000 }),
        depositpaid: faker.datatype.boolean(),
        bookingdates: {
            checkin: faker.date.future().toISOString().split('T')[0],
            checkout: faker.date.future().toISOString().split('T')[0]
        },
        additionalneeds: faker.lorem.words(3)
    });


    let booking = generateBookingData();
    let updatedbooking = generateBookingData();

    before(function (done) {
        bookingClient
            .post('/auth')
            .send(userAuthData)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.token).not.to.be.null;
                token = res.body.token;
                done();
            });
    });

    it('should successfully create a booking', function (done) {
        bookingClient
            .post('/booking')
            .send(booking)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.bookingid).not.to.be.null;
                expect(res.body.booking.firstname).to.be.equal(booking.firstname);
                expect(res.body.booking.lastname).to.be.equal(booking.lastname);
                expect(res.body.booking.totalprice).to.be.equal(booking.totalprice);
                expect(res.body.booking.depositpaid).to.be.equal(booking.depositpaid);
                expect(res.body.booking.bookingdates.checkin).to.be.equal(booking.bookingdates.checkin);
                expect(res.body.booking.bookingdates.checkout).to.be.equal(booking.bookingdates.checkout);
                expect(res.body.booking.additionalneeds).to.be.equal(booking.additionalneeds);

                bookingId = res.body.bookingid;
                done();
            });
    });

    it('should fetch the booking of the provided booking id', function (done) {
        bookingClient
            .get('/booking/' + bookingId)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.firstname).to.be.equal(booking.firstname);
                expect(res.body.lastname).to.be.equal(booking.lastname);
                expect(res.body.totalprice).to.be.equal(booking.totalprice);
                expect(res.body.depositpaid).to.be.equal(booking.depositpaid);
                expect(res.body.bookingdates.checkin).to.be.equal(booking.bookingdates.checkin);
                expect(res.body.bookingdates.checkout).to.be.equal(booking.bookingdates.checkout);
                expect(res.body.additionalneeds).to.be.equal(booking.additionalneeds);
                done();
            });
    });

    it('should update the booking of the provided booking id using Put request', function (done) {
        bookingClient
            .put('/booking/' + bookingId)
            .send(updatedbooking)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Cookie', 'token=' + token)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.firstname).to.be.equal(updatedbooking.firstname);
                expect(res.body.lastname).to.be.equal(updatedbooking.lastname);
                expect(res.body.totalprice).to.be.equal(updatedbooking.totalprice);
                expect(res.body.depositpaid).to.be.equal(updatedbooking.depositpaid);
                expect(res.body.bookingdates.checkin).to.be.equal(updatedbooking.bookingdates.checkin);
                expect(res.body.bookingdates.checkout).to.be.equal(updatedbooking.bookingdates.checkout);
                expect(res.body.additionalneeds).to.be.equal(updatedbooking.additionalneeds);
                done();
            });
    });

    it('should update the firstname and lastname of booking of the provided booking id', function (done) {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();

        bookingClient
            .patch('/booking/' + bookingId)
            .send({ firstname, lastname })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Cookie', 'token=' + token)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.firstname).to.be.equal(firstname);
                expect(res.body.lastname).to.be.equal(lastname);
                expect(res.body.totalprice).to.be.equal(updatedbooking.totalprice);
                expect(res.body.depositpaid).to.be.equal(updatedbooking.depositpaid);
                expect(res.body.bookingdates.checkin).to.be.equal(updatedbooking.bookingdates.checkin);
                expect(res.body.bookingdates.checkout).to.be.equal(updatedbooking.bookingdates.checkout);
                expect(res.body.additionalneeds).to.be.equal(updatedbooking.additionalneeds);
                done();
            });
    });

    it('should delete the booking of the provided booking id', function (done) {
        bookingClient
            .delete('/booking/' + bookingId)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Cookie', 'token=' + token)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.statusCode).to.be.equal(201);
                done();
            });
    });

    it('should show 404 status code for deleted booking id', function (done) {
        bookingClient
            .get('/booking/' + bookingId)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.statusCode).to.be.equal(404);
                done();
            });
    });
});
