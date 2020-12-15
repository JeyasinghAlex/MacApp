const express = require('express');
const Auth = require('../utils/Auth');

let router = express.Router();

// router.post('/', async (req, res) => {
//     await Auth.signIn(req.body, "user", res);
// });

// router.get('/admin', async (req, res) => {
//     await Auth.signIn(req.body, "admin", res);
// });

router.post('/', async (req, res) => {
    await Auth.signIn(req.body, res);
});

module.exports = router;