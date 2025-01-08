import React from 'react';
// import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      {/* <AddTodo onAdd={(newTodo) => console.log('New Todo Added:', newTodo)} /> */}
      <TodoList />
    </div>
  );
}

export default App;
