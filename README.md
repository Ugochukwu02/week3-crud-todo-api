# Chess Online - Free Online Chess Platform

A web-based chess game with a clean, modern interface. Play chess directly in your browser with move validation, captured pieces tracking, and move history.

## Features

- **Interactive Chess Board**: Click-to-move interface with visual feedback
- **Move Validation**: Implements standard chess rules for all pieces
- **Move History**: Track all moves made during the game
- **Captured Pieces**: View pieces captured by each player
- **Board Flip**: Switch perspective between white and black
- **Undo Move**: Take back the last move
- **REST API**: Backend API for game management

## Screenshots

### Initial Board
![Chess Initial Board](https://github.com/user-attachments/assets/72c262da-e4b7-4550-a7d4-745c69e518d7)

### After Move
![Chess After Move](https://github.com/user-attachments/assets/07ab5eb5-df58-4659-a3dc-2078a7b3c695)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Ugochukwu02/week3-crud-todo-api.git
cd week3-crud-todo-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Development

Run the server in development mode with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Chess Game API

- `GET /` - Serve the chess game frontend
- `POST /api/games` - Create a new chess game
- `GET /api/games` - List all active games
- `GET /api/games/:id` - Get a specific game state
- `POST /api/games/:id/move` - Make a move in a game
- `DELETE /api/games/:id` - Delete a game

### Legacy Todo API

The original TODO endpoints are still available:

- `GET /todos` - Get all todos
- `GET /todos/active` - Get active todos
- `GET /todos/:id` - Get a specific todo
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## How to Play

1. Click on a piece to select it (only pieces of the current player can be selected)
2. Click on a valid destination square to move the piece
3. The game automatically switches turns between white and black
4. Use the "Undo Move" button to take back the last move
5. Use the "Flip Board" button to view from the other player's perspective
6. Use the "New Game" button to start fresh

## Chess Rules Implemented

- **Pawns**: Move forward one square (two on first move), capture diagonally
- **Rooks**: Move horizontally or vertically any number of squares
- **Knights**: Move in an L-shape (2+1 squares)
- **Bishops**: Move diagonally any number of squares
- **Queen**: Combines rook and bishop movement
- **King**: Move one square in any direction

## Technologies Used

- **Backend**: Node.js with Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Chess Pieces**: Unicode chess symbols

## Future Enhancements

Potential features to add:
- Checkmate and check detection
- Castling and en passant special moves
- Pawn promotion
- Game timer
- Multiplayer support with WebSockets
- AI opponent integration
- Save/load game state
- PGN (Portable Game Notation) export

## License

ISC
