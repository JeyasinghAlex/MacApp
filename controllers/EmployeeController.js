const Employee = require('../model/Employee');
const { roles } = require('../utils/roles');
const { resource } = require('../app');


exports.grantAccess = (action, resource) => {
    console.log("I am grant access");
    return async (req, res, next) => {
        console.log(req.employee.id);
        try {
            const permission = roles.can(req.employee.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

exports.allowIfLoggedIn = async (req, res, next) => {
    console.log("hello world");
    try {
        const employee = res.locals.loggedInEmployee;
        console.log("----------------------");
        console.log(employee);
        console.log("----------------------");
        if (!employee) {
            return res.status(401).send({
                error: "You need to be logged in to access this route"
            });
        }
        req.employee = employee;
        next()
    } catch (error) {
        next(error)
    }
}

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        // adminName : req.body.adminName,
        // project : req.body.project
    });

    Employee.create(employee, (err, data) => {

        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Employee"
            });
        } else {
            res.send(data);
        }
    })
};

exports.findAll = (req, res) => {
    Employee.getAll((err, data) => {
        if (err) {
            res.send(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        } else {
            res.send(data);
        }
    });
};

exports.find = (req, res) => {
    Employee.get(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(400).send({
                    message: `Not found employee with id ${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Employee with id ${req.params.id}`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Employee.update(req.params.id,
        new Employee(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(400).send({
                        message: `Not found employee with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating Customer with id ${req.params.id}`
                    });
                }
            } else {
                res.send(data);
            }
        });
};

exports.delete = (req, res) => {
    Employee.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "note_found") {
                res.status(404).send({
                    message: `Not found employee with id ${req.params.idd}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete employee id ${req.params.id}`
                });
            }
        } else {
            console.log(data);
            res.send(data);
        }
    });
};