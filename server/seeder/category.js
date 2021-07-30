var Category = require('../models/category');

async function seedCategory(){
  
        let category = new Category();
        category.name = 'Sports';
        category.icon = 'fas icons-color d-block fa-running';
        await category.save();

        let category1 = new Category();
        category1.name = 'Nightlife';
        category1.icon = 'fas icons-color d-block fa-cocktail';
        await category1.save();

        let category2 = new Category();
        category2.name = 'Culture';
        category1.icon = 'fas icons-color d-block fa-university';
        await category2.save();

        let category3 = new Category();
        category3.name = 'Tips & Tricks';
        category1.icon = 'fas icons-color d-block fa-info';
        await category3.save();

        let category4 = new Category();
        category4.name = 'Education';
        category1.icon = 'fas icons-color d-block fa-file-invoice';
        await category4.save();

        let category5 = new Category();
        category5.name = 'Events';
        category1.icon = 'fas icons-color d-block fa-calendar-day';
        await category5.save();
 

    console.log('Catagories Seeded')
}

module.exports = seedCategory;