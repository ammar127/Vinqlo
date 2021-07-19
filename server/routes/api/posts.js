var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var httpResponse = require('express-http-response');
var { body, validationResult } = require('express-validator');
var Post = require('../../models/post');
var auth = require('../auth');
var multer = require('../../utilities/multer');

const cpUpload = multer.fields([
    { name: "header", maxCount: 1 },
]);


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

router.post('/upload', auth.isToken, auth.isUser, cpUpload, (req, res, next) => {
    console.log('here');
    const file = req.files.header[0];
    const path = '/images/' + file.filename;
    next(new httpResponse.OkResponse(path));
})

router.post('/', auth.isToken, auth.isUser, 

body('title').isLength({min: 5}),
body('body').isLength({min: 5}),
body('community').isLength({min: 24}),

(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new httpResponse.BadRequestResponse(JSON.stringify(errors.array())));
        return
    }
    if(req.user.communities.filter(comm => comm._id.toString() === req.body.community).length === 0){
        return next(new httpResponse.BadRequestResponse('You are not part of this community'));
    }
    let post = new Post();
    post.title = req.body.title;
    post.body = req.body.body;
    post.image = req.body.image;
    post.by = req.user._id;
    post.tags = req.body.tags;
    post.community = mongoose.Types.ObjectId(req.body.community);

    post.save((err, savedPost) => {
        if (err) return next(err);
        next(new httpResponse.OkResponse(savedPost));
    })
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


module.exports = router;