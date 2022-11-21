const express = require('express');
const {
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
} = require('../controllers/taskController');

const router = express();

// get all tasks
router.get('/', getTasks);

router.get('/starred', getStarredTasks);

router.get('/finished', getFinishedTasks);

router.get('/myday', getMyDayTasks);

router.get('/planned', getPlannedTasks);
//get a single task
router.get('/:id', getTask);

// creat a task
router.post('/', createTask);

// delete a task
router.delete('/:id', deleteTask);

router.delete('/', deleteAllFinished);

//update a task
router.patch('/:id', updateTask);


module.exports = router;