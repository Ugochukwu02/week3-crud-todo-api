// Chess game state and logic
class ChessGame {
    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
        this.selectedSquare = null;
        this.moveHistory = [];
        this.capturedPieces = { white: [], black: [] };
        this.isFlipped = false;
        this.lastMove = null;
    }

    initializeBoard() {
        const board = Array(8).fill(null).map(() => Array(8).fill(null));
        
        // Pawns
        for (let i = 0; i < 8; i++) {
            board[1][i] = { type: 'pawn', color: 'black' };
            board[6][i] = { type: 'pawn', color: 'white' };
        }
        
        // Rooks
        board[0][0] = board[0][7] = { type: 'rook', color: 'black' };
        board[7][0] = board[7][7] = { type: 'rook', color: 'white' };
        
        // Knights
        board[0][1] = board[0][6] = { type: 'knight', color: 'black' };
        board[7][1] = board[7][6] = { type: 'knight', color: 'white' };
        
        // Bishops
        board[0][2] = board[0][5] = { type: 'bishop', color: 'black' };
        board[7][2] = board[7][5] = { type: 'bishop', color: 'white' };
        
        // Queens
        board[0][3] = { type: 'queen', color: 'black' };
        board[7][3] = { type: 'queen', color: 'white' };
        
        // Kings
        board[0][4] = { type: 'king', color: 'black' };
        board[7][4] = { type: 'king', color: 'white' };
        
        return board;
    }

    getPieceSymbol(piece) {
        const symbols = {
            'white': { 'king': '♔', 'queen': '♕', 'rook': '♖', 'bishop': '♗', 'knight': '♘', 'pawn': '♙' },
            'black': { 'king': '♚', 'queen': '♛', 'rook': '♜', 'bishop': '♝', 'knight': '♞', 'pawn': '♟' }
        };
        return symbols[piece.color][piece.type];
    }

    isValidMove(fromRow, fromCol, toRow, toCol) {
        const piece = this.board[fromRow][fromCol];
        if (!piece || piece.color !== this.currentPlayer) return false;
        
        const targetPiece = this.board[toRow][toCol];
        if (targetPiece && targetPiece.color === piece.color) return false;

        const rowDiff = toRow - fromRow;
        const colDiff = toCol - fromCol;
        const absRowDiff = Math.abs(rowDiff);
        const absColDiff = Math.abs(colDiff);

        switch (piece.type) {
            case 'pawn':
                const direction = piece.color === 'white' ? -1 : 1;
                const startRow = piece.color === 'white' ? 6 : 1;
                
                // Move forward
                if (colDiff === 0 && !targetPiece) {
                    if (rowDiff === direction) return true;
                    if (fromRow === startRow && rowDiff === 2 * direction && !this.board[fromRow + direction][fromCol]) return true;
                }
                
                // Capture diagonally
                if (absColDiff === 1 && rowDiff === direction && targetPiece) {
                    return true;
                }
                return false;

            case 'rook':
                if (rowDiff !== 0 && colDiff !== 0) return false;
                return this.isPathClear(fromRow, fromCol, toRow, toCol);

            case 'knight':
                return (absRowDiff === 2 && absColDiff === 1) || (absRowDiff === 1 && absColDiff === 2);

            case 'bishop':
                if (absRowDiff !== absColDiff) return false;
                return this.isPathClear(fromRow, fromCol, toRow, toCol);

            case 'queen':
                if (rowDiff !== 0 && colDiff !== 0 && absRowDiff !== absColDiff) return false;
                return this.isPathClear(fromRow, fromCol, toRow, toCol);

            case 'king':
                return absRowDiff <= 1 && absColDiff <= 1;

            default:
                return false;
        }
    }

    isPathClear(fromRow, fromCol, toRow, toCol) {
        const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
        const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;
        
        let currentRow = fromRow + rowStep;
        let currentCol = fromCol + colStep;
        
        while (currentRow !== toRow || currentCol !== toCol) {
            if (this.board[currentRow][currentCol]) return false;
            currentRow += rowStep;
            currentCol += colStep;
        }
        
        return true;
    }

    makeMove(fromRow, fromCol, toRow, toCol) {
        if (!this.isValidMove(fromRow, fromCol, toRow, toCol)) return false;

        const piece = this.board[fromRow][fromCol];
        const capturedPiece = this.board[toRow][toCol];

        if (capturedPiece) {
            this.capturedPieces[capturedPiece.color].push(capturedPiece);
        }

        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;

        const moveNotation = this.getMoveNotation(piece, fromRow, fromCol, toRow, toCol, capturedPiece);
        this.moveHistory.push({ from: [fromRow, fromCol], to: [toRow, toCol], notation: moveNotation, piece, capturedPiece });
        
        this.lastMove = { from: [fromRow, fromCol], to: [toRow, toCol] };
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        
        return true;
    }

    getMoveNotation(piece, fromRow, fromCol, toRow, toCol, captured) {
        const files = 'abcdefgh';
        const pieceSymbol = piece.type === 'pawn' ? '' : piece.type[0].toUpperCase();
        const captureSymbol = captured ? 'x' : '';
        const toSquare = files[toCol] + (8 - toRow);
        
        return `${pieceSymbol}${captureSymbol}${toSquare}`;
    }

    undoMove() {
        if (this.moveHistory.length === 0) return false;

        const lastMove = this.moveHistory.pop();
        const [fromRow, fromCol] = lastMove.from;
        const [toRow, toCol] = lastMove.to;

        this.board[fromRow][fromCol] = lastMove.piece;
        this.board[toRow][toCol] = lastMove.capturedPiece || null;

        if (lastMove.capturedPiece) {
            this.capturedPieces[lastMove.capturedPiece.color].pop();
        }

        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        this.lastMove = this.moveHistory.length > 0 ? 
            { from: this.moveHistory[this.moveHistory.length - 1].from, 
              to: this.moveHistory[this.moveHistory.length - 1].to } : null;

        return true;
    }

    reset() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
        this.selectedSquare = null;
        this.moveHistory = [];
        this.capturedPieces = { white: [], black: [] };
        this.lastMove = null;
    }
}

// UI Controller
class ChessUI {
    constructor() {
        this.game = new ChessGame();
        this.boardElement = document.getElementById('chessboard');
        this.statusElement = document.getElementById('status');
        this.setupEventListeners();
        this.renderBoard();
        this.updateUI();
    }

    setupEventListeners() {
        document.getElementById('newGameBtn').addEventListener('click', () => {
            this.game.reset();
            this.renderBoard();
            this.updateUI();
        });

        document.getElementById('flipBoardBtn').addEventListener('click', () => {
            this.game.isFlipped = !this.game.isFlipped;
            this.renderBoard();
        });

        document.getElementById('undoMoveBtn').addEventListener('click', () => {
            if (this.game.undoMove()) {
                this.renderBoard();
                this.updateUI();
            }
        });
    }

    renderBoard() {
        this.boardElement.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const displayRow = this.game.isFlipped ? 7 - row : row;
                const displayCol = this.game.isFlipped ? 7 - col : col;
                
                const square = document.createElement('div');
                square.className = `square ${(displayRow + displayCol) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;

                const piece = this.game.board[row][col];
                if (piece) {
                    const pieceElement = document.createElement('span');
                    pieceElement.className = 'piece';
                    pieceElement.textContent = this.game.getPieceSymbol(piece);
                    square.appendChild(pieceElement);
                }

                if (this.game.lastMove) {
                    const [fromRow, fromCol] = this.game.lastMove.from;
                    const [toRow, toCol] = this.game.lastMove.to;
                    if ((row === fromRow && col === fromCol) || (row === toRow && col === toCol)) {
                        square.classList.add('last-move');
                    }
                }

                square.addEventListener('click', () => this.handleSquareClick(row, col));
                this.boardElement.appendChild(square);
            }
        }
    }

    handleSquareClick(row, col) {
        const piece = this.game.board[row][col];

        if (this.game.selectedSquare) {
            const [fromRow, fromCol] = this.game.selectedSquare;
            
            if (this.game.makeMove(fromRow, fromCol, row, col)) {
                this.game.selectedSquare = null;
                this.renderBoard();
                this.updateUI();
            } else if (piece && piece.color === this.game.currentPlayer) {
                this.game.selectedSquare = [row, col];
                this.renderBoard();
                this.highlightSquare(row, col);
            } else {
                this.game.selectedSquare = null;
                this.renderBoard();
            }
        } else if (piece && piece.color === this.game.currentPlayer) {
            this.game.selectedSquare = [row, col];
            this.highlightSquare(row, col);
        }
    }

    highlightSquare(row, col) {
        const squares = this.boardElement.querySelectorAll('.square');
        squares.forEach(square => {
            if (parseInt(square.dataset.row) === row && parseInt(square.dataset.col) === col) {
                square.classList.add('selected');
            }
        });
    }

    updateUI() {
        this.statusElement.textContent = `${this.game.currentPlayer.charAt(0).toUpperCase() + this.game.currentPlayer.slice(1)} to move`;
        document.getElementById('turnInfo').textContent = this.game.currentPlayer.charAt(0).toUpperCase() + this.game.currentPlayer.slice(1);
        document.getElementById('moveNumber').textContent = Math.floor(this.game.moveHistory.length / 2) + 1;
        document.getElementById('gameStatus').textContent = 'Active';

        // Update move history
        const moveList = document.getElementById('moveList');
        moveList.innerHTML = '';
        this.game.moveHistory.forEach((move, index) => {
            const moveItem = document.createElement('div');
            moveItem.className = 'move-item';
            const moveNum = Math.floor(index / 2) + 1;
            const color = index % 2 === 0 ? 'White' : 'Black';
            moveItem.textContent = `${moveNum}. ${color}: ${move.notation}`;
            moveList.appendChild(moveItem);
        });

        // Update captured pieces
        const capturedWhite = document.getElementById('capturedWhite');
        const capturedBlack = document.getElementById('capturedBlack');
        
        capturedWhite.innerHTML = this.game.capturedPieces.white
            .map(p => `<span class="captured-piece">${this.game.getPieceSymbol(p)}</span>`)
            .join('');
        
        capturedBlack.innerHTML = this.game.capturedPieces.black
            .map(p => `<span class="captured-piece">${this.game.getPieceSymbol(p)}</span>`)
            .join('');
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChessUI();
});
