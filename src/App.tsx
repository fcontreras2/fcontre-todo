import React, { useContext } from "react";
import { ReactComponent as IconAdd } from "./icons/ic_add.svg";

import "./App.scss";
import { TodoContext } from "./provider";
import InputTask from "./components/Task";
import Actions from "./components/Actions";

function App() {
  const { list, dispatch } = useContext(TodoContext);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    if (event.key === "Enter") {
      dispatch({
        type: "ADD_TASK",
        payload: {
          text: currentTarget.value,
          status: "active",
        },
      });
      currentTarget.value = "";
    }
  };

  return (
    <div className="App">
      <div className="todo">
        <h1 className="todo__title">Todo</h1>
        <div className="todo__input">
          <IconAdd className="todo__icon-inital" />
          <input
            autoFocus
            placeholder="Create a new task"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="todo__list">
          {list.length === 0 ? (
            <p className="todo__empty">Empty list</p>
          ) : (
            <>
              {list.map((task, index) => (
                <InputTask index={index} {...task} key={`task-${index}`} />
              ))}
              <Actions />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
