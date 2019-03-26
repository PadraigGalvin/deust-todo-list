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
  res.render('tasks/form', {
    title: 'Create task',
    task: { description: '' },
  });
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

// load edit form task
router.get('/edit/:id', (req, res) => {
  let task = tasks.find((i) => i.id === parseInt(req.params.id, 10));
  if (!task) {
    return res.status(404).send('Not found');
  }
  res.render('tasks/form', { task, title: 'Edit task' });
});

// save changes to task
router.post('/edit/:id', (req, res) => {
  let task = tasks.find((i) => i.id === parseInt(req.params.id, 10));
  if (!task) {
    return res.status(404).send('Not found');
  }
  task.description = req.body.task;
  res.redirect('/tasks');
});

// mark task as done
router.get('/done/:id', (req, res) => {
  let task = tasks.find((i) => i.id === parseInt(req.params.id, 10));
  if (!task) {
    return res.status(404).send('Not found');
  }
  task.done = true;
  res.redirect('/tasks');
});

// mark task as not done
router.get('/undo/:id', (req, res) => {
  let task = tasks.find((i) => i.id === parseInt(req.params.id, 10));
  if (!task) {
    return res.status(404).send('Not found');
  }
  task.done = false;
  res.redirect('/tasks');
});

// remove task
router.get('/delete/:id', (req, res) => {
  let index = tasks.findIndex((i) => i.id === parseInt(req.params.id, 10));
  if (index < 0) {
    return res.status(404).send('Not found');
  }
  tasks.splice(index, 1);
  res.redirect('/tasks');
});

module.exports = router;
