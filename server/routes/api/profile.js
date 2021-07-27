var express = require('express');
var router = express.Router();
var httpResponse = require('express-http-response');
var { body, validationResult } = require('express-validator');
var User = require('../../models/user');
var Post = require('../../models/post');
var Community = require('../../models/community');
var auth = require('../auth');

router.param('email', (req, res, next, email) => {
    User.findOne({ email }, (err, user) => {
        if (!err && user !== null) {
            req.User = user;
            return next();
        }
        return next( httpResponse.BadRequestResponse('User not exist'));
    });
});

router.get('/:email', auth.isToken, auth.isUser, (req, res, next) => {
    next(httpResponse.OkResponse(req.User));
});

router.get('/community/:email', auth.isToken, auth.isUser, (req, res, next) => {

});


module.exports = router;