var router = require('express').Router();
var passport = require('passport');
var mongoose = require('mongoose');
var otpGenerator = require('otp-generator');
var { body, validationResult } = require('express-validator');
const localStrategy = require('../../utilities/passport')
var httpResponse = require('express-http-response');
var User = require('../../models/user');
var Campus = require('../../models/campus');
var Degree = require('../../models/degree');
var emailService = require('../../utilities/emailService')
var auth = require('../auth');

passport.use(localStrategy)
router.use(passport.initialize())

router.param('email', (req, res, next, email) => {
    User.findOne({email: email}, (err, user) => {
        if(!err && user !==null){
            req.User = user;
            return next();
        }
        next(new httpResponse.BadRequestResponse('User not found!'));
    });
});

router.post('/login', passport.authenticate('local', {session:false}), (req, res, next) => {
    req.user.generateToken();
    if(req.user.verified)
        next(new httpResponse.OkResponse({user: req.user.toAuthJSON()}));
    else
        next(new httpResponse.UnauthorizedResponse('Please verify your email address'));
})

router.post('/signup',

body('firstName').isLength({min: 4}),
body('lastName').isLength({min: 4}),
body('email').isEmail(),
body('password').isLength({min: 4}),
body('campus').isLength({min: 4}),
body('degree').isLength({min: 4}),

async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new httpResponse.BadRequestResponse(JSON.stringify(errors.array())));
        return
    }

    const campus = await Campus.findOne({slug: req.body.campus});
    const degree = await Degree.findOne({slug: req.body.degree});


    let user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.campus = campus._id;
    user.degree = degree._id;

    //OTP
    var otp = otpGenerator.generate(6, {alphabets: false, upperCase: false, specialChars: false});
    user.otp = otp;
    var today = new Date();
    today.setHours(today.getHours() + 1);
    user.otpExpiry = today;

    //SendOTP
    emailService.sendEmailVerificationOTP(user);

    user.save();

    next(new httpResponse.OkResponse({user: user.toAuthJSON()}));
})

router.get('/verify/:otp', auth.isToken, async (req, res, next) => {
    req.user = await User.findOne({email: req.email})  
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


router.get('/get/all', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    User.find({status: 1}, (err, users) => {
        next(new httpResponse.OkResponse({users: users}))
    })
})

router.get('/:email', (req, res, next) => {
    next(new httpResponse.OkResponse({user: req.User}));
})

router.put('/delete/:email', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    req.User.status = 0;
    req.User.save();
    next(new httpResponse.OkResponse('User Deleted'));
});

router.put('/block/:email', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    req.User.status = 2;
    req.User.save();
    next(new httpResponse.OkResponse('User Blocked'));
});


module.exports = router;