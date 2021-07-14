require('dotenv').config();
const mongoose = require('mongoose');
// TODO
// export the array's from seeder folder 
// and create the documents here

let con = mongoose.connect('mongodb://localhost/SMARTUP', { // TODO mongodb URI config
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).catch(err => {
  console.log(err);
  process.exit(1);
})
  .then(() => {
    console.log("connected to db in development environment");
    init()
  });

require('./models/User');

const packages = require('./seeder/packages');
const users = require('./seeder/users');

function init() {
  
    console.log("dropping DB");
    mongoose.connection.db.dropDatabase();
  
   
}
 
function exit() {
  console.log('exiting')
  process.exit(1)
}