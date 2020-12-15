const express = require('express');
const AuthController = require('../controllers/AuthController');
const Auth = require('../utils/Auth');

let router = express.Router();

router.post('/user', Auth.signUp(req.body, "user", res));
router.post('/admin', Auth.signUp(req.body, "admin", res));
router.post('/super-admin', Auth.signUp(req.body, "super-admin", res));

module.exports = router;