const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

// Chess game storage (in-memory for simplicity)
let chessGames = {};
let gameIdCounter = 1;

// Chess API endpoints
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/games', (req, res) => {
    const gameId = gameIdCounter++;
    chessGames[gameId] = {
        id: gameId,
        board: initializeChessBoard(),
        currentPlayer: 'white',
        moveHistory: [],
        createdAt: new Date(),
        status: 'active'
    };
    res.status(201).json(chessGames[gameId]);
});

app.get('/api/games/:id', (req, res) => {
    const game = chessGames[req.params.id];
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
});

app.get('/api/games', (req, res) => {
    res.json(Object.values(chessGames));
});

app.post('/api/games/:id/move', (req, res) => {
    const game = chessGames[req.params.id];
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }
    
    const { from, to } = req.body;
    if (!from || !to) {
        return res.status(400).json({ message: 'Invalid move format' });
    }
    
    game.moveHistory.push({ from, to, timestamp: new Date() });
    game.currentPlayer = game.currentPlayer === 'white' ? 'black' : 'white';
    
    res.json(game);
});

app.delete('/api/games/:id', (req, res) => {
    if (!chessGames[req.params.id]) {
        return res.status(404).json({ message: 'Game not found' });
    }
    delete chessGames[req.params.id];
    res.status(204).send();
});

function initializeChessBoard() {
    const board = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Setup initial chess position
    const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    
    for (let i = 0; i < 8; i++) {
        board[0][i] = { type: pieces[i], color: 'black' };
        board[1][i] = { type: 'pawn', color: 'black' };
        board[6][i] = { type: 'pawn', color: 'white' };
        board[7][i] = { type: pieces[i], color: 'white' };
    }
    
    return board;
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Chess game available at http://localhost:${PORT}`);
});