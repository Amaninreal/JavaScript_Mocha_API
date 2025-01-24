require('dotenv').config();

const config = {
    BASE_URL: process.env.BASE_URL, 
    PARAM_URL: process.env.PARAM_URL,
    BOOKING_URL: process.env.BOOKING_URL,
    USER_NAME: process.env.USER_NAME,
    PASSWORD: process.env.PASSWORD,
};

module.exports = config;
