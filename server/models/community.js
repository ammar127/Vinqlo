var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosastic = require('mongoosastic');
var mongoosePaginate = require('mongoose-paginate-v2');
var slug = require('slug');

var communitySchema = mongoose.Schema({
    slug:{
        type: String,
        unique: true
    },

    name:{
        type: String,
        required: true
    },
    campus:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campus',
        required: true
    },
    degree:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Degree',
        required: true
    },
    by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    members:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    membersCount: {
        type: Number,
        default: 1
    }

});

communitySchema.pre('findOne', function(next) {
    this.populate('by');
    this.populate('category');
    this.populate('members');
    next();
});

communitySchema.pre('find', function(next) {
    this.populate('by');
    this.populate('category');
    this.populate('members');
    next();
});

communitySchema.plugin(uniqueValidator);
communitySchema.plugin(mongoosastic);
communitySchema.plugin(mongoosePaginate);

communitySchema.pre('validate', function(next){
    if(!this.slug)
      this.slugify()
    next()
})

communitySchema.methods.slugify = function(){
    this.slug = slug('com') + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

communitySchema.methods.toJSON = function(){
    return{
        slug: this.slug,
        name: this.name,
        by: this.by,
        category: this.category,
        members: this.members,
        membersCount: this.membersCount
    }
}

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;