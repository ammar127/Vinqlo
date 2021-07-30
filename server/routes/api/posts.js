var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var httpResponse = require('express-http-response');
var { body, validationResult } = require('express-validator');
var Post = require('../../models/post');
var Community = require('../../models/community');
var Category = require('../../models/category');
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
    next(new httpResponse.OkResponse(req.post.toJSONFor(req.user)));
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

    Post.paginate({community: {$in : req.user.communities}, status:1}, options, (err, posts) => {
        if (err) return next(err);
        posts.docs = posts.docs.map(post => post.toJSONFor(req.user));
        next(new httpResponse.OkResponse(posts));
    });
});

router.get('/get/my', auth.isToken, auth.isUser, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };

    Post.paginate({by: req.user._id, status:1}, options, (err, posts) => {
        if (err) return next(err);
        posts.docs = posts.docs.map(post => post.toJSONFor(req.user));
        next(new httpResponse.OkResponse(posts));
    });
});

router.get('/save/:status/:slug', auth.isToken, auth.isUser, async (req, res, next) => {
    if(+req.params.status === 1){

        if(req.user.saved.indexOf(req.post._id) !== -1){
            next(new httpResponse.BadRequestResponse('You have already saved this post'));
            return;
        }

        req.user.saved.push(req.post._id);
    }
    else{

        if(req.user.saved.indexOf(req.post._id) === -1){
            next(new httpResponse.BadRequestResponse('You have not already saved this post'));
            return;
        }
        req.user.saved.pull(req.post._id);
    }

    await req.user.save();
    await req.post.save();

    next(new httpResponse.OkResponse('Successful'));
});

router.get('/get/saved',  auth.isToken, auth.isUser, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };

    Post.paginate({_id: {$in: req.user.saved}, status:1}, options, (err, posts) => {
        if (err) return next(err);
        posts.docs = posts.docs.map(post => post.toJSONFor(req.user));
        next(new httpResponse.OkResponse(posts));
    });
});

router.get('/get/liked',  auth.isToken, auth.isUser, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };

    Post.paginate({_id: {$in: req.user.liked}, status:1}, options, (err, posts) => {
        if (err) return next(err);
        posts.docs = posts.docs.map(post => post.toJSONFor(req.user));
        next(new httpResponse.OkResponse(posts));
    });
});

router.get('/get/by/:community', auth.isToken, auth.isUser, (req, res, next) => {

    Community.findOne({slug: req.params.community}, (err, community) => {
        if(!err && community !== null){
            const options = {
                page: req.query.page || 1,
                limit: req.query.limit || 10
            };
        
            Post.paginate({community: community, status:1}, options, (err, posts) => {
                if (err) return next(err);
                posts.docs = posts.docs.map(post => post.toJSONFor(req.user));
                next(new httpResponse.OkResponse(posts));
            }); 
        }
        else{
            next(new httpResponse.UnauthorizedResponse('Community not found!'));
        }
    });
})

router.get('/like/:status/:slug', auth.isToken, auth.isUser, async (req, res, next) => {
    if(+req.params.status === 1){

        if(req.user.liked.indexOf(req.post._id) !== -1){
            next(new httpResponse.BadRequestResponse('You have already liked this post'));
            return;
        }

        req.post.likeCount++;
        req.user.liked.push(req.post._id);
    }
    else{

        if(req.user.liked.indexOf(req.post._id) === -1){
            next(new httpResponse.BadRequestResponse('You have not already liked this post'));
            return;
        }

        req.post.likeCount--;
        req.user.liked.pull(req.post._id);
    }

    await req.user.save();
    await req.post.save();

    next(new httpResponse.OkResponse('Successful'));

});

router.get('/search/:title', auth.isToken, auth.isUser, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };

    Post.paginate({title: new RegExp(req.params.title, 'i'), status:1}, options, (err, posts) => {
        console.log(err);
        posts.docs = posts.docs.map(post => post.toJSONFor(req.user));
        next(new httpResponse.OkResponse(posts));
    });
});

router.post('/status/:status/:slug', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    req.post.status = +req.params.status;
    req.post.save((err, post) => {
        if(err) return next(err);
        next(new httpResponse.OkResponse({message: 'Successful'}));
    });
});

module.exports = router;