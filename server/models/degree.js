var mongoose = require('mongoose');
var slug = require('slug');

var degreeSchema = mongoose.Schema({
    slug:{
        type: String,
        unique: true
    },

    name:{
        type: String,
        required: true
    },

});




degreeSchema.pre('validate', function(next){
    if(!this.slug)
      this.slugify()
    next()
})

degreeSchema.methods.slugify = function(){
    this.slug = slug('de') + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

degreeSchema.methods.toJSON = function(){
    return{
        slug: this.slug,
        name: this.name,
    }
}

const Degree = mongoose.model('Degree', degreeSchema);
module.exports = Degree;