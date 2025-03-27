# React Native x Express To-Do App

A full-stack to-do application built using **React Native** for the frontend and **Express.js** with **MongoDB** for the backend.

## Features

- ✅ Add, edit, and delete tasks
- 📅 Mark tasks as completed
- 🔄 Persistent storage with MongoDB
- 📡 RESTful API with Express.js

## Tech Stack

### Frontend
- React Native (Expo or Bare Workflow)
- Axios for API requests

### Backend
- Node.js with Express.js
- MongoDB with Mongoose

## Installation

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file):
   ```sh
   BACKEND_URL= your backend URL
   ```
4. Add your mongodb database:
   ```sh
   host it locally
4. Start the server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React Native app:
   ```sh
   npm start  # or expo start
   ```

## API Endpoints
| Method | Endpoint       | Description              |
|--------|---------------|--------------------------|
| GET    | /api/todos    | Fetch all tasks         |
| POST   | /api/todos    | Add a new task          |
| PUT    | /api/todos/:id | Update a task  (later) |
| DELETE | /api/todos/:id | Delete a task  (later)  |

## Contributing
Feel free to submit a pull request or report issues!

## License
This project is licensed under the MIT License.
