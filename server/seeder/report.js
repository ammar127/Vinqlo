var faker = require('faker');
var User = require('../models/user');
var Post = require('../models/post');
var Report = require('../models/report');

async function seedReport(){
    const users = await User.find();
    const posts = await Post.find();

    for(var i=0; i<9; i++){
        const n1 = Math.floor(Math.random() * 80);
        const n2 = Math.floor(Math.random() * 80);
        const n3 = Math.floor(Math.random() * 80);

        let report = new Report();
        report.body = faker.lorem.text();
        report.post = posts[n1]._id;
        report.user = posts[n2]._id;
        report.by = posts[n3]._id;

        await report.save();
    }

    console.log('Reports Seeded')
}

module.exports = seedReport;