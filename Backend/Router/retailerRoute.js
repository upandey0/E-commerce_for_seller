const express = require('express');

const {sellerSignup,sellerSignIn} = require('../Controller/sellerCon')

const router = express.Router();

router.post('/signup',sellerSignup)
router.post('/signin',sellerSignIn)

module.exports = router  