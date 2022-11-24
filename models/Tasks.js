const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean
    },
    starred: {
        type: Boolean

    },
    extra: {
        type: String,
        enum: ['my day', '']
    },
    planned: {
        type: String
    },
    note: {
        type: String
    },
    user_id: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Task', taskSchema);