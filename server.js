const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors());

app.use(express.json());

// Sample in-memory data
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// Get all users
app.get('/', (req, res) => {
  res.send('Welcome to the REST API');
});

// Get a specific user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Add a new user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update a user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    user.name = req.body.name;
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
