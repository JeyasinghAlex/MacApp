const Auth = require('../utils/Auth');
const express = require('express');
const { fetchUser, updateUser, deleteUser, fetchAllUser } = require('../controllers/UserController');
let router = express.Router();

// router.post('/login/user', passport.authenticate('jwt', {session : false}), async (req, res) => {

// });

router.get('/user', Auth.userAuth, Auth.checkRole(["user", "admin", "super-admin"]), async (req, res) => {
    return res.json(Auth.serializeUser(req.user));
});

router.get('/user/:id', Auth.userAuth, Auth.checkRole(["user", "admin", "super-admin"]), async (req, res) => {
    await fetchUser(req.params.id, res);
});

router.get('/users', Auth.userAuth, Auth.checkRole(["super-admin"]), async (req, res) => {
    await fetchAllUser(req, res);
});

router.put('/user', Auth.userAuth, Auth.checkRole(["user", "super-admin"]), async (req, res) => {
    await updateUser(req.user._id, req.body, res);
});

router.delete('/user', Auth.userAuth, Auth.checkRole(["user"]), async (req, res) => {
    await deleteUser(req.user._id, res);
});

router.delete('/user/:id', Auth.userAuth, Auth.checkRole(["user", "admin", "super-admin"]), async (req, res) => {
    await deleteUser(req.params.id, res);
});

module.exports = router;