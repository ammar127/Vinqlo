var express = require('express');
var router = express.Router();
var { body, validationResult } = require('express-validator');
var httpResponse = require('express-http-response');
var Report = require('../../models/report');
var Post = require('../../models/post');
var auth = require('../auth');

router.param('slug', (req, res, next, slug) => {
    Report.findOne({slug: slug}, (err, report) => {
        if(!err && degree !==null){
            req.report = report;
            return next();
        }
        next(new httpResponse.BadRequestResponse('Report not found!'));
        next();
    });
});

router.get('/:slug', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    next(new httpResponse.OkResponse(req.report));
});

router.post('/', auth.isToken, auth.isUser,

body('body').isLength({min: 4}),
body('post').isLength({min: 4}),

(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new httpResponse.BadRequestResponse(JSON.stringify(errors.array())));
        return
    }

    Post.findOne({slug: req.body.post}, (err, post) => {
        if(!err && post !== null){
            let report = new Report();
            report.post = post._id;
            report.user = post.by._id;
            report.by = req.user._id;
            report.body = req.body.body;

            report.save((err, report) => {
                if(!err && report !== null){
                    next(new httpResponse.OkResponse(report));
                }
                next(new httpResponse.BadRequestResponse('Report not created!'));
            });
        }
        else{
            next(new httpResponse.BadRequestResponse('Post not found!'));
        }
    });
});

module.exports = router;