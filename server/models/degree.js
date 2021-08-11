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

    membersCount: {
        type: Number,
        default: 0
    },
    
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

});


const prePopulate = function () {
    //this.populate('members');
}
degreeSchema.pre('find', prePopulate);
degreeSchema.pre('findOne', prePopulate);
degreeSchema.pre('findById',prePopulate);

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
        membersCount: this.membersCount,
        members: this.members
    }
}

const Degree = mongoose.model('Degree', degreeSchema);
module.exports = Degree;