const express = require('express');
const swaggerUi = require('swagger-ui-express');
const openapi = require('./openapi.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ----- In-memory "database" (Stage 2) -----

let tasks = [
  { id: 1, title: 'Learn HTTP', done: true },
  { id: 2, title: 'Build CRUD API', done: false },
  { id: 3, title: 'Push to GitHub', done: false }
];
let nextId = 4;

// ----- Stage 1: root + health -----
app.get('/', (req, res) => {
  res.json({
    name: 'Task API',
    version: '1.0',
    endpoints: ['/tasks']
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ----- Stage 2: READ -----
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  res.json(task);
});

// ----- Stage 3: CREATE -----
app.post('/tasks', (req, res) => {
  const { title } = req.body || {};

  if (title === undefined || title === null || String(title).trim() === '') {
    return res.status(400).json({
      error: 'title is required and cannot be empty'
    });
  }

  const newTask = {
    id: nextId++,
    title: String(title).trim(),
    done: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ----- Stage 4: UPDATE -----

app.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  const { title, done } = req.body || {};

  if (title !== undefined && String(title).trim() === '') {
    return res.status(400).json({ error: 'title cannot be empty' });
  }
  if (title === undefined && done === undefined) {
    return res.status(400).json({ error: 'provide title and/or done' });
  }
  if (done !== undefined && typeof done !== 'boolean') {
    return res.status(400).json({ error: 'done must be a boolean' });
  }

  if (title !== undefined) task.title = String(title).trim();
  if (done !== undefined) task.done = done;

  res.json(task); // 200 OK
});

// ----- Stage 4: DELETE -----
// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  tasks.splice(index, 1);
  res.status(204).send(); // success, empty body
});

// ----- Stage 5: Swagger UI at /docs -----
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

// ----- Stage 0: start listening (skip when required by tests) -----
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger UI at http://localhost:${PORT}/docs`);
  });
}

module.exports = app;