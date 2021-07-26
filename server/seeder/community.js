const faker = require('faker')
var Community = require('../models/community');
var User = require('../models/user');
var Campus = require('../models/campus');
async function seedCommunity(){
    const users = await User.find().select('_id');
    const campuses = await Campus.find();
    
    for(var i=0; i<20; i++){
        const n = Math.floor(Math.random()*80);
        const n1 = Math.floor(Math.random() * 5);
        const n2 = Math.floor(Math.random() * 2);

        
        let community = new Community();
        community.name = faker.company.companyName();
        community.by = users[n]._id;
        community.campus = campuses[n1]._id;
        community.degree = campuses[n1].degrees[n2]._id;

        await community.save();
    }

    console.log('Communities Seeded!')
}

module.exports = seedCommunity