var express = require('express');
var router = express.Router();
var httpResponse = require('express-http-response');
var { body, validationResult } = require('express-validator');
var User = require('../../models/user');
var Post = require('../../models/post');
var Community = require('../../models/community');
var auth = require('../auth');

router.param('email', (req, res, next, email) => {

});

module.exports = router;