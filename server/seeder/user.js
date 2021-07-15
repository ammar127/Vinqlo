var faker = require('faker');
var User = require('../models/user');
var Campus = require('../models/campus');

async function seedUser(){

    const campuses = await Campus.find();
    
    for(var i=0;i<100;i++){

        const n1 = Math.floor(Math.random() * 9);
        const n2 = Math.floor(Math.random() * 2);

        let user = new User();
        user.name = faker.name.findName();
        user.email = faker.internet.email();
        await user.setPassword(faker.internet.password());
        user.bio = faker.lorem.sentence(); 
        user.campus = campuses[n1]._id;
        user.degree = campuses[n1].degree[n2];

        await user.save();
    }

    console.log('Users Seeded')
}

module.exports = seedUser;