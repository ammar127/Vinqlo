var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosastic = require('mongoosastic');
var mongoosePaginate = require('mongoose-paginate-v2');
var slug = require('slug');

var notificationSchema = mongoose.Schema({
    slug:{
        type: String,
        unique: true
    },

    body:{
        type: String,
        required: true
    },

    by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },

    isRead: {
        type: Boolean,
        default: false
    },

    time:{
        type: Date,
        default: Date.now
    }

});

notificationSchema.pre('findOne', function (next) {
    this.populate('by');
    this.populate('to');
    this.populate('post');
    next();
});

notificationSchema.pre('find', function (next) {
    this.populate('by');
    this.populate('to');
    this.populate('post');
    next();
});


notificationSchema.plugin(uniqueValidator);
notificationSchema.plugin(mongoosastic);
notificationSchema.plugin(mongoosePaginate);

notificationSchema.pre('validate', function(next){
    if(!this.slug)
      this.slugify()
    next()
})

notificationSchema.methods.slugify = function(){
    this.slug = slug('co') + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

notificationSchema.methods.toJSON = function(){
    return{
        slug: this.slug,
        body: this.body,
        by: {
            firstName: this.by.firstName,
            lastName: this.by.lastName,
            email: this.by.email,
            image: this.by.image
        },
        to: {
            firstName: this.to.firstName,
            lastName: this.to.lastName,
            email: this.to.email
        },
        post: {
            title: this.post.title,
            slug: this.post.slug,
        },

        isRead: this.isRead,
        time: this.time
    }
}

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;