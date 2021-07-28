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
            req.emailUser = user;
            return next();
        }
        next(new httpResponse.BadRequestResponse('User not found!'));
    });
});

router.post('/login', passport.authenticate('local', {session:false}), (req, res, next) => {
    const user = req.user;
    user.generateToken();

    if(!user.verified){
        return next(new httpResponse.UnauthorizedResponse('You email is not verified', 401.1));
    }

    if(user.status === 2){
        return next(new httpResponse.UnauthorizedResponse('Your account blocked by admin', 401.2));
    }

    next(new httpResponse.OkResponse({user: req.user.toAuthJSON()}));    
})

router.post('/signup',

body('firstName').isLength({min: 4}).withMessage('First name is too short'),
body('lastName').isLength({min: 4}).withMessage('Last name is too short'),
body('email').isEmail().withMessage('Invalid Email'),
body('password').isLength({min: 4}).withMessage('Password is too short'),
body('campus').isLength({min: 4}).withMessage('Campus Required'),
body('degree').isLength({min: 4}).withMessage('Degree Required'),

async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new httpResponse.BadRequestResponse('Missing Paramter',422,errors));
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


    user.save((err, user) => {
        if(err){
            next(new httpResponse.BadRequestResponse(err, 400.1));
        }
        else{
            emailService.sendEmailVerificationOTP(user);
            next(new httpResponse.OkResponse({user: user.toAuthJSON()}));
        }
    });
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


router.get('/get/all', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };
    var query = {};

    if(typeof req.query.status !== 'undefined' && req.query.status !== null){
        query = {status: req.query.status};
    }else {
        query = {status: {$ne: 0}};
    }

    User.paginate(query, options, (err, users) => {
        next(new httpResponse.OkResponse({users: users}))
    })
})

router.get('/:email', (req, res, next) => {
    next(new httpResponse.OkResponse({user: req.emailUser}));
})

router.put('/status/:status/:email', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    req.emailUser.status = +req.params.status;
    req.emailUser.save();
    next(new httpResponse.OkResponse('Updated Successfully'));
})

router.get('/', auth.isToken, auth.isUser,(req, res, next) => {
    req.user.generateToken();
    next(new httpResponse.OkResponse({user: req.user.toAuthJSON()}));
})
router.put('/delete/:email', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    req.emailUser.status = 0;
    req.emailUser.save();
    next(new httpResponse.OkResponse('Updated Successfully'));
});


router.get('/resendOtp/:email', (req, res, next) => {
    var user = req.emailUser;
    var otp = otpGenerator.generate(6, {alphabets: false, upperCase: false, specialChars: false});
    user.otp = otp;
    var today = new Date();
    today.setHours(today.getHours() + 1);
    user.otpExpiry = today;

    //SendOTP
    emailService.sendEmailVerificationOTP(user);

    user.save();
    next(new httpResponse.OkResponse({otp: user.otp}));
});

router.get('/verifyOtp/:otp/:email', (req, res, next) => {
    var today = new Date();
    if(today.getTime() > req.emailUser.otpExpiry.getTime()){
        next(new httpResponse.UnauthorizedResponse('OTP is expired'));
        return;
    }
    if(req.params.otp !== req.emailUser.otp){
        next(new httpResponse.UnauthorizedResponse('OTP is invalid'));
        return;
    }

    // req.emailUser.otp = null;
    // req.emailUser.otpExpiry = null;
    req.emailUser.verified = true;

    emailService.sendEmailVerificationSuccess(req.emailUser);

    req.emailUser.save();

    next(new httpResponse.OkResponse('Otp verified Successfully'));
});

module.exports = router;