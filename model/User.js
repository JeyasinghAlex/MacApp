const mongoose = require('mongoose');
// const { Schema, model } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin", "super-admin"]
    },
    password: {
        type: String,
        required: true
    },
    project: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'projects',
            status: { type: Boolean, default: false }
        }
    ]
}, {
    versionKey: false
});

module.exports = mongoose.model("user", UserSchema);