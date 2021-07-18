var Category = require('../models/category');

async function seedCategory(){
  
        let category = new Category();
        category.name = 'Sports';
        await category.save();

        let category1 = new Category();
        category1.name = 'Nightlife';
        await category1.save();

        let category2 = new Category();
        category2.name = 'Culture';
        await category2.save();

        let category3 = new Category();
        category3.name = 'Tips & Tricks';
        await category3.save();

        let category4 = new Category();
        category4.name = 'Education';
        await category4.save();

        let category5 = new Category();
        category5.name = 'Events';
        await category5.save();
 

    console.log('Catagories Seeded')
}

module.exports = seedCategory;