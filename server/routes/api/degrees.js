var express = require('express');
var router = express.Router();
var { body, validationResult } = require('express-validator');
var httpResponse = require('express-http-response');
var auth = require('../auth');



module.exports = router;