var jsonwebtoken = require('jsonwebtoken');
var User = require('../models/user');
var httpResponse = require('express-http-response');

const isToken = function (req, res, next){
    var token = req.headers.authorization.split(' ')
    if(typeof token[1] === 'undefined' || typeof token[1] === null){
        next(new httpResponse.UnauthorizedResponse());
    }
    else{
        jsonwebtoken.verify(token[1], 'shhhhh', (err, data) => {
            if(err){
              next(new httpResponse.UnauthorizedResponse());
            }
            else{
                req.email = data.user
                next()
            }
        })
    }
}

const isUser = function(req, res, next){
    User.findOne({email: req.email}, (err, user) => {
        if(err){
          next(new httpResponse.UnauthorizedResponse());
        }
        else{
            req.user = user
            next()
        }
    })   
}

const isAdmin = function(req, res, next){
    if(req.user.userType === 1){
        next()
    }
    else
    next(new httpResponse.UnauthorizedResponse());
}

module.exports = {isToken, isUser, isAdmin}