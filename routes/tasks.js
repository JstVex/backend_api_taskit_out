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
    getPlannedTasks,
    countTasks
} = require('../controllers/taskController');

const requireAuth = require('../middleware/requireAuth')

const router = express();

// require auth for all routes
router.use(requireAuth)

// get all tasks
router.get('/', getTasks);

router.get('/counttasks', countTasks);

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