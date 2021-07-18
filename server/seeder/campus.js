var faker = require('faker');
var Campus = require('../models/campus');
var Degree = require('../models/degree');

async function seedCampus(){
    for(var i=0; i<20; i++){
        let campus = new Campus();
        campus.name = faker.company.companyName();
        degrees = [];
        for(var i=0; i<5; i++){
            let d = new Degree();
            d.name = faker.company.companySuffix()
            await d.save();
            degrees.push(d);
        }


        campus.degrees = degrees;
        await campus.save();
    }

    console.log('Campuses Seeded')
}

module.exports = seedCampus;