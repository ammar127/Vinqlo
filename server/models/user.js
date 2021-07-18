var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosastic = require('mongoosastic');
var mongoosePaginate = require('mongoose-paginate-v2');
var bcrypt = require('bcrypt');
var jsonwebtoken = require('jsonwebtoken');

var userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    bio:{
        type: String,
    },
    
    campus:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campus',
        required: true
    },

    degree:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Degree',
        required: true,
    },

    communities:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Community'
    },
    
    saved:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post'
    },

    role:{
        type: Number,
        enum:[1, 2, 3],
        default: 3
    }, // 1- Super Admin, 2- Admin, 3- User

    verified:{
        type: Boolean,
        default: false
    }, 

    otp:{
        type: String,
    }, 

    otpExpiry: {
        type: Date
    }

});

const preFind = function () {
    this.populate('saved');
    this.populate('campus');
    this.populate('degree');
    this.populate('communities');
}
userSchema.pre('findOne', preFind);
userSchema.pre('find', preFind);
userSchema.pre('findById', preFind);

userSchema.plugin(uniqueValidator);
userSchema.plugin(mongoosastic);
userSchema.plugin(mongoosePaginate);

userSchema.methods.setPassword =  function(pass){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    this.password = hash
}

userSchema.methods.comparePassword = function(pass){
    return bcrypt.compareSync(pass, this.password)
}

userSchema.methods.generateToken = function(){
    this.token = jsonwebtoken.sign({user: this.email}, 'shhhhh')
}

userSchema.methods.toAuthJSON = function(){
    this.generateToken()
    return{
        token: this.token,
        name: this.name,
        email: this.email,
        bio: this.bio,
        campus: this.campus,
        degree: this.degree,
        saved: this.saved,
        communities: this.communities, 
        role: this.role
    }
}

userSchema.methods.toJSON = function(){
    return{
        name: this.name,
        email: this.email,
        bio: this.bio,
        campus: this.campus,
        degree: this.degree,
        saved: this.saved,
        communities: this.communities, 
        role: this.role
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;