const Task = require('../models/Tasks');
const mongoose = require('mongoose');

// get all tasks
const getTasks = async (req, res) => {
    const user_id = req.user._id
    const tasks = await Task.find({ user_id }).sort({ starred: -1, checked: 1 });
    res.status(200).json(tasks)
}

const getStarredTasks = async (req, res) => {
    const user_id = req.user._id
    const tasks = await Task.find({ user_id, starred: true }).sort({ starred: -1, checked: 1 });
    res.status(200).json(tasks)
}

const getFinishedTasks = async (req, res) => {
    const user_id = req.user._id
    const tasks = await Task.find({ user_id, checked: true }).sort({ starred: -1, checked: 1 });
    res.status(200).json(tasks)
}

const getMyDayTasks = async (req, res) => {
    const user_id = req.user._id
    const tasks = await Task.find({ user_id, extra: "my day" }).sort({ starred: -1, checked: 1 });
    res.status(200).json(tasks)
}

const getPlannedTasks = async (req, res) => {
    const user_id = req.user._id
    const tasks = await Task.find({
        user_id,
        planned: { $exists: true },
        $expr: { $gt: [{ $strLenCP: '$planned' }, 1] }
    }).sort({ starred: -1, checked: 1 });
    res.status(200).json(tasks)
}


// get a single task
const getTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such task:(' })
    }

    const task = await Task.findById(id);

    if (!task) {
        return res.status(404).json({ error: 'no such task:(' })
    }

    res.status(200).json(task)
}

// creat new task
const createTask = async (req, res) => {
    const { task, checked, starred, extra, note } = req.body;

    let emptyFields = [];

    if (!task) {
        emptyFields.push('task')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'pwease fill in the fields boo boo ^^', emptyFields })
    }

    try {
        const user_id = req.user._id
        const taskie = await Task.create({ task, checked, starred, extra, note, user_id })
        res.status(200).json(taskie)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a task
const deleteTask = async (req, res) => {
    const user_id = req.user._id;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such task:(' })
    }

    const task = await Task.findOneAndDelete({ _id: id, user_id });

    if (!task) {
        return res.status(404).json({ error: 'no such task:(' })
    }

    res.status(200).json(task)
}

const deleteAllFinished = async (req, res) => {
    const user_id = req.user._id;

    const task = await Task.deleteMany({ checked: true, user_id });

    if (!task) {
        return res.status(404).json({ error: 'no such task:(' })
    }

    res.status(200).json(task)
}

// update a task
const updateTask = async (req, res) => {
    const user_id = req.user._id;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such task:(' })
    }

    const task = await Task.findOneAndUpdate({ _id: id, user_id }, { ...req.body }, {
        new: true
    });

    if (!task) {
        return res.status(404).json({ error: 'no such task:(' })
    }

    res.status(200).json(task)
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
    getStarredTasks,
    getFinishedTasks,
    getMyDayTasks,
    deleteAllFinished,
    getPlannedTasks
}