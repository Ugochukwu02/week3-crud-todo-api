const express = require('express');

const app = express();

app.use(express.json());

let todos = [
    { id: 1, task: 'Learn Node.js', completed: false },
    { id: 2, task: 'Build a REST API', completed: false }
];

app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

app.get('/todos/active', (req, res) => {
    const activeTodos = todos.filter(t => !t.completed);
    res.status(200).json(activeTodos);
});

app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
});


app.post('/todos', (req, res) => {
    const { task, completed = false } = req.body;
    if (!task || typeof task !== 'string' || !task.trim()) {
        return res.status(400).json({ message: 'Task is required' });
    }
    const newTodo = { id: todos.length + 1, task: task.trim(), completed: Boolean(completed) };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.patch('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (todo) {
        Object.assign(todo, req.body);
        res.status(200).json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }   
}); 

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = todos.length;
    todos = todos.filter(t => t.id !== id);
    if (todos.length === initialLength)
        return res.status(404).json({ message: 'Todo not found' });
    res.status(204).send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});