const express = require('express');
const Auth = require('../utils/Auth');
let router = express.Router();

router.post('/user', async(req, res) => {
    await Auth.signUp(req.body, "user", res);
});

router.post('/admin', async(req, res) => {
    await Auth.signUp(req.body, "admin", res);
});

router.post('/super-admin', async(req, res) => {
    await Auth.signUp(req.body, "super-admin", res);
});
module.exports = router;