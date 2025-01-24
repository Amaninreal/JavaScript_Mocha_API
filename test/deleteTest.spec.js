const { apiClient } = require('../utils/apiClient');
const expect = require('chai').expect;
const { faker } = require('@faker-js/faker');

describe('Delete API tests using supertest', function () {

    it('should successfully pass the test for delete request with valid user ID', async function () {
        const userId = faker.number.int({ min: 1, max: 100 });

        const res = await apiClient
            .delete(`/api/users/${userId}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');

        expect(res.statusCode).to.be.equal(204); 
        expect(res.body).to.be.empty;
    });

});
