var express = require('express');
var router = express.Router();
var { body, validationResult } = require('express-validator');
var httpResponse = require('express-http-response');
var Report = require('../../models/report');
var Post = require('../../models/post');
var User = require('../../models/user');
var Community = require('../../models/community');
var auth = require('../auth');

router.param('slug', (req, res, next, slug) => {
    Report.findOne({slug: slug}, (err, report) => {
        console.log(err);
        if(!err && report !==null){
            req.report = report;
            return next();
        }
        next(new httpResponse.BadRequestResponse('Report not found!'));
    });
});

router.get('/:slug', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    next(new httpResponse.OkResponse(req.report));
});

router.post('/', auth.isToken, auth.isUser,

body('body').isLength({min: 4}),
body('type').isLength({min: 1}),
body('key').isLength({min: 4}),

async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new httpResponse.BadRequestResponse(JSON.stringify(errors.array())));
        return
    }

    let report = new Report();
    report.by = req.user._id;
    report.body = req.body.body;
    report.type = req.body.type;

    if(req.body.type === 0){
        const post = await Post.findOne({slug: req.body.key});
        report.post = post._id;
    }
    else if(req.body.type === 1){
        const user = await User.findOne({email: req.body.key});
        report.user = user._id;
    }
    else if(req.body.type === 2){
        const community = await Community.findOne({slug: req.body.key});
        report.community = community._id;
    }

    report.save((err, report) => {
        if(!err && report !== null){
            next(new httpResponse.OkResponse(report));
        }
        next(new httpResponse.BadRequestResponse('Report not created!'));
    });

});

router.delete('/:slug', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    req.report.remove();
    next(new httpResponse.OkResponse('Report deleted Successfully'));
});


router.get('/get/all', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };

    var query = {};
    console.log(req.query.type);

    if(typeof req.query.type !== 'undefined' && req.query.type !== null){
        query = {type: +req.query.type};
    }

    Report.paginate(query, options, (err, reports) => {
        if(err){
            next(new httpResponse.BadRequestResponse(err));
        }
        else{
            next(new httpResponse.OkResponse({reports: reports}));
        }
    });
});

module.exports = router;