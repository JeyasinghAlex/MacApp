const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    member: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ]
});

module.exports = model('project', ProjectSchema);