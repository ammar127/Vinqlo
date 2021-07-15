var router = require('express').Router();
var httpResponse = require('express-http-response');
var User = require('../../models/user');

router.param('email', (req, res, next, email) => {
    User.findOne({email: email}, (err, user) => {
        if(!err && user !==null){
            req.user = user;
            next();
        }
        next(new httpResponse.BadRequestResponse('User not found!'));
    });
});

router.post('/login', (req, res, next) => {
    
})

module.exports = router;