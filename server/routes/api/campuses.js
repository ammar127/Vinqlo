var express = require('express');
var router = express.Router();
var { body, validationResult } = require('express-validator');
var httpResponse = require('express-http-response');
var Campus = require('../../models/campus');
var auth = require('../auth');

router.param('slug', (req, res, next, slug) => {
    Campus.findOne({slug: slug}, (err, campus) => {
        if(!err && campus !==null){
            req.campus = campus;
            return next();
        }
        next(new httpResponse.BadRequestResponse('Campus not found!'));
        next();
    });
});

router.get('/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    next(new httpResponse.OkResponse(req.campus));
});

router.post('/', auth.isToken, auth.isUser, auth.isAdmin, 

body('name').isLength({min: 4}),

(req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new httpResponse.BadRequestResponse(JSON.stringify(errors.array())));
        return
    }

    let campus = new Campus();
    campus.name = req.body.name;

    campus.save((err, campus) => {
        if(err){
            next(new httpResponse.BadRequestResponse(err));
            return;
        }
        next(new httpResponse.OkResponse(campus));
    });

});

router.put('/:slug', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    if(typeof req.body.name !== 'undefined' && req.body.name !== null){
        req.campus.name = req.body.name;
    }

    req.campus.save();

    next(new httpResponse.OkResponse(req.campus));
});

router.delete('/:slug', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    Campus.deleteOne({slug: req.params.slug}, (err) => {
        if(!err){
            next(new httpResponse.OkResponse('Campus Deleted!'));
        }
    });
});

router.get('/get/all', auth.isToken, auth.isUser, (req, res, next) =>{
    Campus.find({}, (err, campus) => {
        if(!err){
            next(new httpResponse.OkResponse(campus));
        }
    });
});

module.exports = router;