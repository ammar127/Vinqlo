var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var httpResponse = require('express-http-response');
var { body, validationResult } = require('express-validator');
var Community = require('../../models/community');
var User = require('../../models/user');
var auth = require('../auth');

router.param('slug', (req, res, next, slug) => {
    Community.findOne({slug: slug}, (err, community) => {
        if(!err && community !==null){
            req.community = community;
            return next();
        }
        next(new httpResponse.BadRequestResponse('Community not found!'));
    })
})

router.get('/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    next(new httpResponse.OkResponse(req.community));
})

router.post('/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    req.user.communities.push(req.community._id);
    req.user.save((err, user) => {
        next(new httpResponse.OkResponse('Community Join ed Successfully'));
    });
})

router.post('/', auth.isToken, auth.isUser, 
body('name').isLength({min: 4})
,(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new httpResponse.BadRequestResponse(JSON.stringify(errors.array())));
        return
    }

    let community = new Community();
    community.name = req.body.name;
    community.by = req.user._id;
    community.campus = req.user.campus;
    community.degree = req.user.degree;

    req.user.communities.push(community._id);
    req.user.save();

    community.save((err, savedCommunity) => {
        next(new httpResponse.OkResponse(savedCommunity));
    });
})

router.put('/:slug', auth.isToken, auth.isUser, 
body('name').isLength({min: 4})
, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new httpResponse.BadRequestResponse(JSON.stringify(errors.array())));
        return
    }

    req.community.name = req.body.name;
    req.community.save();
    next(new httpResponse.OkResponse(req.community));
})

router.delete('/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    if(req.user._id.toString() === req.community.by._id.toString()){
        Community.deleteOne({slug: req.params.slug}, (err) => {
            if(!err)
                next(new httpResponse.OkResponse('Community deleted Successfully'));
        });
    }
    else{
        next(new httpResponse.UnauthorizedResponse('You cant delete this community'));
    }
})


router.get('/get/all', auth.isToken, auth.isUser, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };

    Community.paginate({by: req.user._id}, options, (err, communities) => {
        if(!err && communities !== null){
            next(new httpResponse.OkResponse(communities));
        }
        else{
            next(new httpResponse.UnauthorizedResponse(err));
        }
    });
})

module.exports = router;