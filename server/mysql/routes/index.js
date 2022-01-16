const express = require('express');
const router = express.Router();
const user = require('./users');
const block= require('./blocks')



// 라우터
router.use('/users', user);
router.use('/blocks', block);


module.exports = router;