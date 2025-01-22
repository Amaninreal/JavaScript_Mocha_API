require('dotenv').config();

const config = {
    BASE_URL: process.env.BASE_URL, 
    PARAM_URL: process.env.PARAM_URL,
    BOOKING_URL: process.env.BOOKING_URL,
};

module.exports = config;
