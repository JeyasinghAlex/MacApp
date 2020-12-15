const User = require("../model/User");
const Project = require("../model/Project");

const fetchUser = async (reqData, res) => {
    try {
        let user = await User.findById(reqData);
        let len = user.project.length;
        var projectName = [];
        for (let i = 0; i < len; ++i) {
            let project = await Project.findById(user.project[i]);
            projectName.push(project.name +', ');
        }
        if (user) {
            return res.status(200).json({
                user,
                projectName
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const fetchAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            'result': users
        });
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async (id, reqData, res) => {
    try {
        const user = await User.findOneAndUpdate({ '_id': id }, { $set: { 'name': reqData.name, 'email': reqData.email, 'contact': reqData.contact } }, { new: true });
        res.status(204).json({
            'result': user
        });
    } catch (error) {
        console.log(error);
    }
}

const updateProjectStatus = async (user, reqData, res) => {
    try {
        const usr = await User.findOneAndUpdate({ _id: user._id, 'project._id': reqData.project.id },
            { $set: { 'project.$.status': reqData.project.status } }, { new: true });
        if (usr) {
            return res.status(200).json({
                usr
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const deleteUser = async (reqData, res) => {
    try {
        const user = await User.findByIdAndRemove(reqData);
        if (user) {
            res.status(200).json({
                user
            });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    fetchUser,
    fetchAllUser,
    updateUser,
    deleteUser,
    updateProjectStatus
}