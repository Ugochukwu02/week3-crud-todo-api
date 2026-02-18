# Week 3 CRUD TODO API

A simple RESTful API for managing todos built with Node.js and Express.js. This API provides full CRUD (Create, Read, Update, Delete) operations for todo items.

## Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js v5.2.1** - Web framework for Node.js
- **dotenv** - Environment variable management

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

## Usage

### Start the server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in the `PORT` environment variable).

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| GET | `/todos/active` | Get all active (incomplete) todos |
| GET | `/todos/:id` | Get a specific todo by ID |
| POST | `/todos` | Create a new todo |
| PATCH | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

---

### 1. Get All Todos

**Endpoint:** `GET /todos`

**Description:** Returns a list of all todos.

**Response:**
```json
Status: 200 OK

[
  {
    "id": 1,
    "task": "Learn Node.js",
    "completed": false
  },
  {
    "id": 2,
    "task": "Build a REST API",
    "completed": false
  }
]
```

**Example:**
```bash
curl http://localhost:3000/todos
```

---

### 2. Get Active Todos

**Endpoint:** `GET /todos/active`

**Description:** Returns a list of all todos that are not completed.

**Response:**
```json
Status: 200 OK

[
  {
    "id": 1,
    "task": "Learn Node.js",
    "completed": false
  }
]
```

**Example:**
```bash
curl http://localhost:3000/todos/active
```

---

### 3. Get Todo by ID

**Endpoint:** `GET /todos/:id`

**Description:** Returns a specific todo by its ID.

**URL Parameters:**
- `id` (number) - The ID of the todo

**Response (Success):**
```json
Status: 200 OK

{
  "id": 1,
  "task": "Learn Node.js",
  "completed": false
}
```

**Response (Not Found):**
```json
Status: 404 Not Found

{
  "message": "Todo not found"
}
```

**Example:**
```bash
curl http://localhost:3000/todos/1
```

---

### 4. Create a New Todo

**Endpoint:** `POST /todos`

**Description:** Creates a new todo item.

**Request Body:**
```json
{
  "task": "Complete project documentation",
  "completed": false
}
```

**Fields:**
- `task` (string, required) - The task description (must be non-empty)
- `completed` (boolean, optional) - Whether the task is completed (defaults to `false`)

**Response (Success):**
```json
Status: 201 Created

{
  "id": 3,
  "task": "Complete project documentation",
  "completed": false
}
```

**Response (Validation Error):**
```json
Status: 400 Bad Request

{
  "message": "Task is required"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"task":"Complete project documentation","completed":false}'
```

---

### 5. Update a Todo

**Endpoint:** `PATCH /todos/:id`

**Description:** Updates an existing todo. You can update any field(s).

**URL Parameters:**
- `id` (number) - The ID of the todo to update

**Request Body:**
```json
{
  "completed": true
}
```

**Response (Success):**
```json
Status: 200 OK

{
  "id": 1,
  "task": "Learn Node.js",
  "completed": true
}
```

**Response (Not Found):**
```json
Status: 404 Not Found

{
  "message": "Todo not found"
}
```

**Example:**
```bash
curl -X PATCH http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

---

### 6. Delete a Todo

**Endpoint:** `DELETE /todos/:id`

**Description:** Deletes a todo by its ID.

**URL Parameters:**
- `id` (number) - The ID of the todo to delete

**Response (Success):**
```
Status: 204 No Content
```

**Response (Not Found):**
```json
Status: 404 Not Found

{
  "message": "Todo not found"
}
```

**Example:**
```bash
curl -X DELETE http://localhost:3000/todos/1
```

---

## Project Structure

```
week3-crud-todo-api/
├── app.js              # Main application file with API routes
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Locked versions of dependencies
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## Features

- ✅ Full CRUD operations for todos
- ✅ RESTful API design
- ✅ Input validation
- ✅ Error handling with appropriate HTTP status codes
- ✅ Filter active todos
- ✅ JSON request/response format

## Development

The application uses in-memory storage, so todos will reset when the server restarts. Initial todos include:
- "Learn Node.js"
- "Build a REST API"

## License

ISC

## Author

Created as part of Week 3 CRUD API project.
