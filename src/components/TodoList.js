import React, { useState, useEffect } from 'react';
import axios from '../axios';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import './TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');

  // Fetch todos from the backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
  };

  const handleDeleteTodo = (deletedId) => {
    setTodos(todos.filter((todo) => todo._id !== deletedId));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'Completed') return todo.completed;
    if (filter === 'Pending') return !todo.completed;
    return true; // 'All' filter
  });

  return (
    <div className="todo-container">
      <h1>Todo Manager</h1>
      <AddTodo onAdd={handleAddTodo} />
      <div className="filter-buttons">
        <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>
          All
        </button>
        <button
          onClick={() => setFilter('Completed')}
          className={filter === 'Completed' ? 'active' : ''}
        >
          Completed
        </button>
        <button onClick={() => setFilter('Pending')} className={filter === 'Pending' ? 'active' : ''}>
          Pending
        </button>
      </div>
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
