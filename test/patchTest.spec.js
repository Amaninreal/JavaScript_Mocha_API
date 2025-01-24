const { apiClient } = require('../utils/apiClient');
const { faker } = require('@faker-js/faker');
const expect = require('chai').expect;

describe('Patch API tests using supertest', function () {

    it('should successfully pass the test for patch request with valid data', async function () {
        const updatedUser = {
            name: faker.person.fullName(),
            job: faker.person.jobTitle(),
        };

        const res = await apiClient
            .patch('/api/users/2')
            .send(updatedUser)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.name).to.be.equal(updatedUser.name);
        expect(res.body.job).to.be.equal(updatedUser.job);
        expect(res.body.updatedAt).not.to.be.null;
    });
});
