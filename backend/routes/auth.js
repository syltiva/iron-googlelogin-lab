const express = require('express');
const { signUpUser, loginUser, googleLogin } = require('../controllers/userController');
const router = express.Router();


router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/googleLogin", googleLogin)

module.exports = router;