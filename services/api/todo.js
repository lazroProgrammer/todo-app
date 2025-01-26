import axios from 'axios';

const ApiUrl = process.env.BACKEND_URL || "http://192.168.0.102:3000/api/v1";
console.log("Api url:",ApiUrl)
// Add a new todo
export const addTodo = (label, completedAt) => {
    const data = {
        label,
        completedAt,
    };
    return axios.post(`${ApiUrl}/todos`, data);
};

// Edit an existing todo
export const editTodo = async (id, label, completedAt) => {
    const data = {
        label,
        completedAt,
    };
    return await axios.put(`${ApiUrl}/todos/${id}`, data); // PUT request to update the todo
};

// Get all todos
export const getTodos = async() => {
    return await axios.get(`${ApiUrl}/todos`);
};

// Delete a todo by ID
export const deleteTodo = async (id) => {
    return await axios.delete(`${ApiUrl}/todos/${id}`); // DELETE request with the ID in the URL
};
