import { useState } from "react";
import "./App.scss";
import "./main.scss"

function App() {

  const [todos, setTodos] = useState(
    JSON.parse(window.localStorage.getItem("todos")) || []
  );

  const handleAddTodo = (e) => {
    if (e.keyCode === 13 && e.target.value.length > 2) {
      const newTodo = {
        id: todos[todos.length - 1]?.id + 1 || 1,
        title: e.target.value,
        isCompleted: false,
      };

      setTodos([...todos, newTodo]);
      window.localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));

      e.target.value = "";
      
    }
  };

  const handleDeleteTodo = (e) => {
    let filteredTodos = todos.filter(
      (todo) => todo.id !== Number(e.target.dataset.id)
    );
    
    setTodos(filteredTodos);
    window.localStorage.setItem("todos", JSON.stringify(filteredTodos));
  };

  const handleCompletedTodo = (e) => {
    todos.forEach((todo) => {
      if (todo.id === Number(e.target.dataset.id)) {
        todo.isCompleted = e.target.checked;
        window.localStorage.setItem("todos", JSON.stringify(todos));
      }
    });

    setTodos(JSON.parse(window.localStorage.getItem("todos")) || []);
    window.localStorage.setItem("todos", JSON.stringify(todos));
  };

  return (
    <div className="container">
        <h1 className="heading">Make some tasks</h1>


      <div className="todo__box">
            <input className="todo__input" type="text" onKeyUp={handleAddTodo} />
            {todos.length > 0 && (
                <div>
                    <ul className="todo__list">
                  {todos.map((item) => (
                      <li key={item.id} className={`${item.isCompleted && "checked"} todo__item`}>
                      <input
                          checked={item.isCompleted}
                          type="checkbox"
                          data-id={item.id}
                          onChange={handleCompletedTodo}
                      />
                      <span className="checkmark"></span>
                      <p className="todo__text">
                          {item.title}
                      </p>
                      <button className="todo__x-btn" data-id={item.id} onClick={handleDeleteTodo}>
                          x
                      </button>
                      </li>
                  ))}
                  </ul>

                  {todos.length > 0 && (
                    <div className="result-box">
                        <p className="all-todos">All tasks: {todos.length}</p>
                        <p className="completed">Completed tasks: {todos.filter((todo) => todo.isCompleted).length}</p>
                        <p className="efficiency">Efficiency: {Math.floor((todos.filter((todo) => todo.isCompleted).length / todos.length) * 100)} %</p>
                    </div>
                  )}
                </div>
            )}
      </div>
    </div>
  );
}

export default App;
