var faker = require('faker');
var User = require('../models/user');
var Campus = require('../models/campus');

async function seedInfo(){

    const campuses = await Campus.find();

    let user = new User();
    user.name = 'Usman';
    user.email = 'usman@gmail.com';
    await user.setPassword('1234');
    user.bio = faker.lorem.sentence(); 
    user.campus = campuses[2]._id;
    user.degree = campuses[2].degrees[2]._id;

    await user.save();

    let user2 = new User();
    user2.name = 'admin';
    user2.email = 'admin@gmail.com';
    await user2.setPassword('1234');
    user2.bio = faker.lorem.sentence(); 
    user2.campus = campuses[2]._id;
    user2.degree = campuses[2].degrees[2]._id;
    user2.role = 2;
    user2.verified = true;
    await user2.save();

    console.log('Your Info Seeded')
}

module.exports = seedInfo;