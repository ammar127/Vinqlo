let router = require('express').Router();


router.use('/values', require('./values'));
router.use('/users', require('./users'));
router.use('/communities', require('./communities'));
router.use('/posts', require('./posts'));
router.use('/campuses', require('./campuses'));

module.exports = router;