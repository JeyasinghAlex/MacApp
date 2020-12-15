const Project = require('../model/Project');
const User = require('../model/User');


const validateProject = async name => {
    let project = await Project.findOne({ name });
    return project ? true : false;
}

const createProject = async (reqData, res) => {
    try {
        let isProjectPresent = await validateProject(reqData.name);
        if (isProjectPresent) {
            return res.status(400).json({
                message: 'project already present',
                success: false
            });
        }

        const newProject = new Project({
            ...reqData
        });

        await newProject.save();
        return res.status(201).json({
            message: "Hurry! now you are successfully crated project.",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to create project.",
            success: false
        });
    }
}

const fetchAllProject = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({
            projects
        });
    } catch (error) {
        console.log(error);
    }
}

const fetchProjectEmployee = async (reqData, res) => {
    try {
        // let project = await Project.find({ 'name': reqData.name });
        let userName = [];
        for (let i = 0; i < reqData.length; ++i) {
            let user = await User.findById(reqData[i]);
            userName.push(user.name);
        }
        return res.status(200).json({
            userName
        });
    } catch (error) {
        console.log(error);
    }
}

const updateProject = async (reqData, res) => {
    try {
        const project = await Project.findByIdAndUpdate({ "_id": reqData.id },
            { "$push": { 'member': reqData.member } },
            { "new": true, "upsert": true });

        let len = reqData.member.length;
        for (var i = 0; i < len; ++i) {
            await User.findByIdAndUpdate({ '_id': reqData.member[i] },
                { '$push': { 'project': reqData.id } },
                { 'new': true, 'upsert': true });
        }

        return res.status(204).json({
            'project': project
        });
    } catch (error) {
        console.log(error);
    }
}

const removeProject = async (reqData, res) => {
    try {
        console.log('--------------------');
        console.log(reqData);
        console.log('---------------------');
        let project = await Project.findByIdAndRemove(reqData);
        if (project) {
            res.status(200).json({
                project
            });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createProject,
    fetchProjectEmployee,
    fetchAllProject,
    updateProject,
    removeProject
}