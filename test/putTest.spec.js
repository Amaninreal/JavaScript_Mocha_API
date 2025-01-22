const { apiClient } = require('../utils/apiClient');
const { faker } = require('@faker-js/faker');
const expect = require('chai').expect;

describe('Put API tests using supertest', function () {

    it('should successfully pass the test for put request with dynamic data', async function () {
        const updatedUser = {
            name: faker.person.fullName(),
            job: faker.person.jobTitle()
        };

        const res = await apiClient
            .put('/api/users/2')
            .send(updatedUser)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        
        console.log(res.body);

        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.have.property('name', updatedUser.name); 
        expect(res.body).to.have.property('job', updatedUser.job);
        
        expect(res.body).to.have.property('updatedAt').that.is.not.null; 

        if (res.body.updatedAt) {
            const timestamp = new Date(res.body.updatedAt);
            expect(timestamp).to.be.a('date');
            expect(timestamp).to.be.greaterThan(new Date('2025-01-01')); 
        }
    });

});
