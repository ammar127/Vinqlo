let router = require('express').Router();


router.use('/values', require('./values'));
router.use('/users', require('./users'));

module.exports = router;