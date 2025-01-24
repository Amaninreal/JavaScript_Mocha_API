const supertest = require('supertest');
const { BASE_URL, PARAM_URL, BOOKING_URL, USER_NAME, PASSWORD } = require('../global'); 

const apiClient = supertest(BASE_URL);
const fakerClient = supertest(PARAM_URL);
const bookingClient = supertest(BOOKING_URL);

const userAuthData = {
    username: USER_NAME,
    password: PASSWORD,
};


module.exports = {apiClient, fakerClient, bookingClient, userAuthData};
