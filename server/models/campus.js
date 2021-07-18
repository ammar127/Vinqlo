var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosastic = require('mongoosastic');
var mongoosePaginate = require('mongoose-paginate-v2');
var slug = require('slug');

var campusSchema = mongoose.Schema({
    slug:{
        type: String,
        unique: true
    },

    name:{
        type: String,
        required: true
    },

    degree:{
        type: [String]
    }

});

campusSchema.plugin(mongoosastic);
campusSchema.plugin(mongoosePaginate);

campusSchema.pre('validate', function(next){
    if(!this.slug)
      this.slugify()
    next()
})

campusSchema.methods.slugify = function(){
    this.slug = slug('ca') + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

campusSchema.methods.toJSON = function(){
    return{
        slug: this.slug,
        name: this.name,
        degree: this.degree,
    }
}

const Campus = mongoose.model('Campus', campusSchema);
module.exports = Campus;