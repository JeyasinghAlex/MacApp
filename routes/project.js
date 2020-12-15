const express = require('express');
// const { userAuth, checkRole } =  require('../utils/Auth');
const Auth = require('../utils/Auth');
const { createProject, fetchProjectEmployee, fetchAllProject, updateProject, removeProject } = require('../controllers/project');
let router = express.Router();

router.post('/', Auth.userAuth, Auth.checkRole(["super-admin"]), async (req, res) => {
    await createProject(req.body, res);
});

router.get('/', Auth.userAuth, Auth.checkRole(["super-admin"]), async (req, res) => {
    await fetchAllProject(req.body, res);
});

router.put('/', Auth.userAuth, Auth.checkRole(["super-admin"]), async (req, res) => {
    await updateProject(req.body, res);
});

router.post('/employees', Auth.userAuth, Auth.checkRole(["super-admin"]), async (req, res) => {
    await fetchProjectEmployee(req.body, res);
});

router.delete('/:id', Auth.userAuth, Auth.checkRole(["super-admin"]), async (req, res) => {
    await removeProject(req.params.id, res);
});

module.exports = router;