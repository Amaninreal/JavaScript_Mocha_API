const { apiClient } = require('../utils/apiClient');
const { faker } = require('@faker-js/faker');
const expect = require('chai').expect;

describe('Post API tests using supertest', function () {

    it('should successfully pass the test for post API with dynamic data', async function () {
        const newUser = {
            name: faker.person.fullName(),
            job: faker.person.jobTitle()  
        };

        const res = await apiClient
            .post('/api/users')
            .send(newUser)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');

        console.info(res.body);
        //Validating response data and Property
        expect(res.statusCode).to.be.equal(201); 
        expect(res.body).to.have.property('name', newUser.name);  
        expect(res.body).to.have.property('job', newUser.job); 
        expect(res.body).to.have.property('id').that.is.not.null;
        expect(res.body).to.have.property('createdAt').that.is.not.null;

        // Validating creating data
        if (res.body.createdAt) {
            const timestamp = new Date(res.body.createdAt);
            expect(timestamp).to.be.a('date');
            expect(timestamp).to.be.greaterThan(new Date('2020-01-01'));
        }
    });

});
