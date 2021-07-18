var router = require('express').Router();
var passport = require('passport');
var mongoose = require('mongoose');
var otpGenerator = require('otp-generator');
var { body, validationResult } = require('express-validator');
const localStrategy = require('../../utilities/passport')
var httpResponse = require('express-http-response');
var User = require('../../models/user');
var emailService = require('../../utilities/emailService')
var auth = require('../auth');

passport.use(localStrategy)
router.use(passport.initialize())

router.param('email', (req, res, next, email) => {
    User.findOne({email: email}, (err, user) => {
        if(!err && user !==null){
            req.user = user;
            next();
        }
        next(new httpResponse.BadRequestResponse('User not found!'));
    });
});

router.post('/login', passport.authenticate('local', {session:false}), (req, res, next) => {
    req.user.generateToken();
    if(req.user.verified)
        next(new httpResponse.OkResponse(req.user.toAuthJSON()));
    else
        next(new httpResponse.UnauthorizedResponse('Please verify your email address'));
})

router.post('/signup',

body('name').isLength({min: 4}),
body('email').isEmail(),
body('password').isLength({min: 4}),
body('campus').isLength({min: 24}),
body('degree').isLength({min: 2}),

(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new httpResponse.BadRequestResponse(JSON.stringify(errors.array())));
        return
    }

    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.campus = mongoose.Types.ObjectId(req.body.campus);
    user.degree = req.body.degree

    //OTP
    var otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    user.otp = otp;
    var today = new Date();
    today.setHours(today.getHours() + 1);
    user.otpExpiry = today;

    //SendOTP
    emailService.sendEmailVerificationOTP(user);

    user.save();

    next(new httpResponse.OkResponse(user.toAuthJSON()));
})

router.get('/verify/:otp', auth.isToken, auth.isUser, (req, res, next) => {
    var today = new Date();
    if(today.getTime() > req.user.otpExpiry.getTime()){
        next(new httpResponse.UnauthorizedResponse('OTP is expired'));
        return;
    }
    if(req.params.otp !== req.user.otp){
        next(new httpResponse.UnauthorizedResponse('OTP is invalid'));
        return;
    }

    req.user.otp = null;
    req.user.otpExpiry = null;
    req.user.verified = true;

    emailService.sendEmailVerificationSuccess(req.user);

    req.user.save();

    next(new httpResponse.OkResponse('Email verified Successfully'));

})


router.get('/get/all', auth.isToken, auth.isAdmin, (req, res, next) => {
    User.find((err, users) => {
        next(new httpResponse.OkResponse(users))
    })
})

router.get('/:email', (req, res, next) => {
    next(new httpResponse.OkResponse(req.user));
})




module.exports = router;