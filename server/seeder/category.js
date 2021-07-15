var faker = require('faker');
var Category = require('../models/category');

async function seedCategory(){
    for(var i=0;i<10;i++){
        
        let category = new Category();
        category.name = faker.lorem.word();

        await category.save();
    }

    console.log('Catagories Seeded')
}

module.exports = seedCategory;