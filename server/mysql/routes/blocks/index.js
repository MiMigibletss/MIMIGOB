const express = require('express');
const router = express.Router();
const block = require('./block');


// const { auth } = require("../../middleware/auth");

// router.get("/auth", auth, (req, res) => {
//     res.status(200).json({
//         id: req.user.id,
//         isAdmin: req.user.role === 0 ? false : true,
//         isAuth: true,
//         email: req.user.email,
//         name: req.user.name,
//         public: req.user.public,
//         private: req.user.private,
   
//     });
// });

router.use('/block', block);


module.exports = router;