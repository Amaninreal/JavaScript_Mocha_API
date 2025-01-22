const { apiClient, fakerClient } = require('../utils/apiClient');
const expect = require('chai').expect;
const { faker } = require('@faker-js/faker');

describe('Get API tests using supertest', function () {

    it('should successfully pass the test for get API with query param', async function () {
        const res = await apiClient
            .get('/api/users')
            .query({ page: '2' })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
    
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.page).to.be.equal(2);
        expect(res.body.data).to.be.an('array').that.is.not.empty;
    
        if (res.body.data.length > 0) {
            expect(res.body.data[0].id).to.be.a('number');
            expect(res.body.data[0].first_name).to.be.a('string');
        } else {
            console.warn('No users found on page 2.');
        }
    });

    it('should successfully pass the test for get API without query param', async function () {
        const userId = faker.number.int({ min: 1, max: 10 });  // Correct usage of faker

        const res = await apiClient
            .get(`/api/users/${userId}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');

        expect(res.statusCode).to.be.equal(200);
        expect(res.body.data.id).to.be.equal(userId);
        expect(res.body.data.first_name).to.be.a('string');
    });

    it('should successfully pass the test for get API with path param', async function () {
        const authorId = faker.number.int({ min: 1, max: 10 });
        const res = await fakerClient
            .get(`/api/v1/Authors/${authorId}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');

        expect(res.statusCode).to.be.equal(200);
        expect(res.body.id).to.be.equal(authorId);
    });

    it('should return 404 when trying to fetch a user with an invalid ID', async function () {
        const invalidUserId = faker.number.int({ min: 1000, max: 9999 });
    
        const response = await apiClient
            .get(`/api/users/${invalidUserId}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
    
        expect(response.status).to.equal(404);
        expect(response.body).to.deep.equal({});
    });
});
