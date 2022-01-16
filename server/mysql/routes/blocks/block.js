const express = require("express");
const router = express.Router();
const { Block } = require('../../models');

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body); // POST /user/
    if (exUser) {
      return res.json({ success: false });
    }
    console.log(req.body);
    await Block.create({
     
      hash: req.body.hash,
 
    });
    return res.status(200).json({
      success: true
    });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

module.exports = router;