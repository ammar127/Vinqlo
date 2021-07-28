var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var httpResponse = require('express-http-response');
var { body, validationResult } = require('express-validator');
var Post = require('../../models/post');
var Community = require('../../models/community');
var auth = require('../auth');


router.param('slug', (req, res, next, slug) => {
    Post.findOne({slug: slug}, (err, post) => {
        if(!err && post !==null){
            req.post = post;
            next();
            return;
        }
        next(new httpResponse.BadRequestResponse('Post not found!'));
    });
});


router.get('/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    next(new httpResponse.OkResponse(req.post));
});


router.post('/', auth.isToken, auth.isUser, 

body('title').isLength({min: 5}),
body('body').isLength({min: 5}),
body('community').isLength({min: 5}),

(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new httpResponse.BadRequestResponse(JSON.stringify(errors.array())));
        return
    }

    const community = Community.findOne({slug: req.body.community}, (err, community) => {
        console.log(community, req.user);

        if(req.user.communities.filter(comm => comm._id.toString() === community._id.toString()).length === 0){
            return next(new httpResponse.BadRequestResponse('You are not part of this community'));
        }

        let post = new Post();
        post.title = req.body.title;
        post.body = req.body.body;
        post.image = req.body.image;
        post.by = req.user._id;
        post.tags = req.body.tags;
        post.community = community._id;

        post.save((err, savedPost) => {
            if (err) return next(err);
            next(new httpResponse.OkResponse(savedPost));
        })
    });
});


router.get('/get/feed', auth.isToken, auth.isUser, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };

    Post.paginate({community: {$in : req.user.communities}}, options, (err, posts) => {
        if (err) return next(err);
        next(new httpResponse.OkResponse(posts));
    });
});

router.get('/get/my', auth.isToken, auth.isUser, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };

    Post.paginate({by: req.user._id}, options, (err, posts) => {
        if (err) return next(err);
        next(new httpResponse.OkResponse(posts));
    });
});

router.post('/save/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    req.user.saved.push(req.post._id);
    req.user.save();
    next(new httpResponse.OkResponse('Post added to Saved Posts'));
});

router.post('/like/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    req.user.liked.push(req.post._id);
    req.user.save();
    req.post.likeCount++;
    req.post.save();
    next(new httpResponse.OkResponse('Post added to Liked Posts'));
});

module.exports = router;