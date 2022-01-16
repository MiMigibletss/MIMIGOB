const express = require("express");
const router = express.Router();
const { Block } = require('../../models');

router.post('/', async (req, res, next) => { // POST /post
  try {
    const fullhash = await Block.create({
      hash: req.body.hash,
      // version: req.body.version,
      // timespent: req.body.timespent,
      // nonce: req.body.nonce,
      // date: req.body.date,
  
    });

    res.status(201).json({ success: true, fullhash });
  } catch (error) {
    console.error(error);
    return res.status(400).send(err);
  }
});

module.exports = router;