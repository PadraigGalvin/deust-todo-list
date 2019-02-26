const express = require('express');
const router = express.Router();

let tasks = [];
let counter = 0;

// view task list
router.get('/', (req, res) => {
  res.render('tasks/index', { tasks: tasks });
});

// show create task form
router.get('/create', (req, res) => {
  res.render('tasks/form');
});

// submit create task from
router.post('/create', (req, res) => {
  tasks.push({
    id: ++counter,
    description: req.body.task,
    done: false,
  });
  res.redirect('/tasks');
});

// remove task
router.post('/delete/:id', (req, res) => {
  // find task and delete
});

module.exports = router;
