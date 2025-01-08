import React, { useState } from 'react';
import axios from '../axios';
import './TodoList.css';

function TodoItem({ todo, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);

  // Handle toggling the todo completion
  const handleToggleComplete = async () => {
    try {
      const updatedTodo = await axios.put(`/${todo._id}`, {
        ...todo,
        completed: !todo.completed, // Toggle completion status
      });
      onUpdate(updatedTodo.data); // Update the parent state
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Handle deleting the todo
  const handleDelete = async () => {
    try {
      await axios.delete(`/${todo._id}`);
      onDelete(todo._id); // Remove the todo from the list
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Handle editing the todo title and description
  const handleEdit = async () => {
    if (!newTitle.trim()) {
      alert('Title is required.');
      return;
    }

    if (newTitle !== todo.title || newDescription !== todo.description) {
      try {
        const updatedTodo = await axios.put(`/${todo._id}`, {
          ...todo,
          title: newTitle.trim(),
          description: newDescription.trim(),
        });
        onUpdate(updatedTodo.data);
      } catch (error) {
        console.error('Error editing todo:', error);
      }
    }
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete} // Toggling the completion status
      />
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter title"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Enter description (optional)"
          ></textarea>
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div>
          <span
            onClick={handleToggleComplete}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} // Strikethrough on completion
          >
            {todo.title}
          </span>
          {todo.description && <p>{todo.description}</p>}
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
