let router = require('express').Router();


router.use('/values', require('./values'));

module.exports = router;