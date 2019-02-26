const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks');

const port = 3000;
const app = express();

// Configure views
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout' });

// Transform text in request body to JS objects
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Make files in public folder accessible from outside
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/tasks');
});

app.use('/tasks', tasksRouter);

// Error handlers
app.use((req, res, next) => {
  res.status(404).send('Not found');
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Internal server error');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
