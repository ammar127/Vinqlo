var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosastic = require('mongoosastic');
var mongoosePaginate = require('mongoose-paginate-v2');
var slug = require('slug');

var reportSchema = mongoose.Schema({
    slug:{
        type: String,
        unique: true
    },

    body:{
        type: String,
        required: true
    },

    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    time:{
        type: Date,
        default: Date.now
    }

});

reportSchema.pre('find', (next) => {
    this.populate('post');
    this.populate('user');
    this.populate('by');
    next();
});

reportSchema.plugin(uniqueValidator);
reportSchema.plugin(mongoosastic);
reportSchema.plugin(mongoosePaginate);

reportSchema.pre('validate', function(next){
    if(!this.slug)
      this.slugify()
    next()
})

reportSchema.methods.slugify = function(){
    this.slug = slug('or') + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

reportSchema.methods.toJSON = function(){
    return{
        slug: this.slug,
        body: this.body,
        post: this.post,
        user: this.user,
        by: this.by,
        time: this.time
    }
}

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;