const express = require("express");
const router = express.Router();

const { Block } = require("../../models");

router.post('/', async (req, res, next) => {
  try {
    const fullblock = await Block.findAll({
    });

    res.status(201).json({ success: true, fullblock });

  } catch (error) {
    console.error(error);
    return res.status(400).send(err);
  }
});

module.exports = router;