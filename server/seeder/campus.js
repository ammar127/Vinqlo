var faker = require('faker');
var Campus = require('../models/campus');

async function seedCampus(){
    for(var i=0; i<20; i++){
        let campus = new Campus();
        campus.name = faker.company.companyName();
        degree = [];
        degree.push(faker.lorem.word());
        degree.push(faker.lorem.word());
        degree.push(faker.lorem.word());
        campus.degree = degree;
        await campus.save();
    }

    console.log('Campuses Seeded')
}

module.exports = seedCampus;