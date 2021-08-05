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
        ref: 'Comment'
    },

    community:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    },

    likeCount:{
        type: Number,
        default: 0
    },

    status : {
        type: Number,
        default: 1
        // 1 active 2 blocked
    },

    time:{
        type: Date,
        default: Date.now
    }

});

postSchema.pre('findOne', function (next) {
    this.populate('by');
    this.populate('comments');
    this.populate('community');
    next();
});

postSchema.pre('find', function (next) {
    this.populate('by');
    this.populate('comments');
    this.populate('community');
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
        by: {
            firstName: this.by.firstName,
            lastName: this.by.lastName,
            email: this.by.email,
            image: this.by.image
        },
        tags: this.tags,
        comments: this.comments,
        community: {
            slug: this.community.slug,
            name: this.community.name,
            category: this.community.category,
            membersCount: this.community.membersCount
        },
        time: this.time,
        likeCount: this.likeCount
    }
}

postSchema.methods.toJSONFor = function(user){
    return{
        slug: this.slug,
        title: this.title,
        body: this.body,
        image: this.image,
        by: {
            firstName: this.by.firstName,
            lastName: this.by.lastName,
            email: this.by.email,
            image: this.by.image
        },
        tags: this.tags,
        comments: this.comments,
        community: {
            slug: this.community.slug,
            name: this.community.name,
            category: this.community.category,
            membersCount: this.community.membersCount
        },
        time: this.time,
        likeCount: this.likeCount,
        isLiked: user.isLiked(this._id),
        isSaved: user.isSaved(this._id)
    }
}

const Post = mongoose.model('Post', postSchema);
module.exports = Post;