var mongoose = require('mongoose');
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

    degrees:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Degree',}]

});

const prePopulate = function () {
        this.populate('degrees');
}
campusSchema.pre('find', prePopulate);
campusSchema.pre('findOne', prePopulate);
campusSchema.pre('findById',prePopulate);

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
        degrees: this.degrees,
    }
}

const Campus = mongoose.model('Campus', campusSchema);
module.exports = Campus;