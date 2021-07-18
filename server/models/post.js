var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosastic = require('mongoosastic');
var mongoosePaginate = require('mongoose-paginate-v2');
var slug = require('slug');

var postSchema = mongoose.Schema({
    slug:{
        type: String,
        unique: true
    },

    title:{
        type: String,
        required: true
    },

    body:{
        type: String,
        required: true
    },

    image:{
        type: String
    },

    by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    tags:{
        type: [String]
    },

    comments:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
    },

    community:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    },

    time:{
        type: Date,
        default: Date.now
    }

});

postSchema.pre('findOne', (next) => {
    this.populate('by');
    this.populate('comments');
    next();
});

postSchema.plugin(uniqueValidator);
postSchema.plugin(mongoosastic);
postSchema.plugin(mongoosePaginate);

postSchema.pre('validate', function(next){
    if(!this.slug)
      this.slugify()
    next()
})

postSchema.methods.slugify = function(){
    this.slug = slug('po') + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

postSchema.methods.toJSON = function(){
    return{
        slug: this.slug,
        title: this.title,
        body: this.body,
        image: this.image,
        by: this.by,
        tags: this.tags,
        comments: this.comments,
        time: this.time
    }
}

const Post = mongoose.model('Post', postSchema);
module.exports = Post;