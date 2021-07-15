var faker = require('faker')
var Community = require('../models/community');
var User = require('../models/user');

async function seedCommunity(){
    const users = await User.find().select('_id');
    for(var i=0; i<20; i++){
        const n = Math.floor(Math.random()*80);
        
        let community = new Community();
        community.name = faker.company.companyName();
        community.by = users[n]._id;

        await community.save();
    }

    console.log('Communities Seeded!')
}

module.exports = seedCommunity