var express = require('express');
var router = express.Router();
var httpResponse = require('express-http-response');
var { body, validationResult } = require('express-validator');
var Comment = require('../../models/comment');
var Post = require('../../models/post');
var auth = require('../auth');

router.param('slug', (req, res, next, slug) => {
    Comment.findOne({slug: slug}, (err, comment) => {
        console.log(err);
        if(!err && comment !==null){
            req.comment = comment;
            return next();
        }
        else next(new httpResponse.BadRequestResponse('Comment not found!'));
    });
});

router.get('/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    next(new httpResponse.OkResponse(req.comment));
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

    let comment = new Comment();
    comment.body = req.body.body;
    comment.by = req.user._id;

    Post.findOne({slug: req.body.post}, (err, post) => {
        if(!err && post !== null){
            post.comments.push(comment);
            post.save((err, post) => {
                comment.save((err, comment) => {
                    next(new httpResponse.OkResponse(comment));
                });
            });
        }
        else{
            next(new httpResponse.BadRequestResponse('Post not found!'));
            next();
        }
    });

});

router.delete('/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    if(req.comment.by._id.toString() === req.user._id.toString()){
        Post.findOne({comments: req.comment._id}, (err, post) => {
            if(!err && post !== null){
                post.comments.pull(req.comment._id);
                post.save((err, post) => {
                    req.comment.remove((err, comment) => {
                        next(new httpResponse.OkResponse('Comment Deleted'));
                    });
                });
            }
            else{
                next(new httpResponse.BadRequestResponse('Post not found!'));
                next();
            }
        });
    }
    else{
        next(new httpResponse.UnauthorizedResponse('You are not authorized to delete this comment'));
    }
});


module.exports = router;