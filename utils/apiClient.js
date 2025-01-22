const supertest = require('supertest');
const { BASE_URL, PARAM_URL, BOOKING_URL } = require('../global'); 

const apiClient = supertest(BASE_URL);
const fakerClient = supertest(PARAM_URL);
const bookingClient = supertest(BOOKING_URL);


module.exports = {apiClient, fakerClient, bookingClient};
