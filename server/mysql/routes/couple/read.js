const express = require("express");
const router = express.Router();
const { User } = require("../../models");

router.post('/', async (req, res, next) => {
  try {
    const fullAllUser = await User.findAll(
    );
    const Images = await User.findAll({
    });

    let allUser = [];

    for (let i = 0; i < fullAllUser.length; i++) {
      allUser.push({
        id: fullAllUser[i].dataValues.id,
        email: fullAllUser[i].dataValues.email,
        name: fullAllUser[i].dataValues.name,
        image: fullAllUser[i].dataValues.image,
        address: fullAllUser[i].dataValues.address,
        gender: fullAllUser[i].dataValues.gender,
        public: fullAllUser[i].dataValues.public,
        private: fullAllUser[i].dataValues.private,
        provider: fullAllUser[i].dataValues.provider,
        snsId: fullAllUser[i].dataValues.snsId,
        couple_code: fullAllUser[i].dataValues.couple_code,
        message: fullAllUser[i].dataValues.message,
      })
    }
    res.status(201).json({ success: true, allUser });
  } catch (error) {
    console.error(error);
    return res.status(400).send(err);
  }
});

module.exports = router;
