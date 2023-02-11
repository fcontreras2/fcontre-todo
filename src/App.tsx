import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as IconAdd } from "./icons/ic_add.svg";

import "./App.scss";
import { Task, TaskFilter, TodoContext } from "./provider";
import InputTask from "./components/Task";
import Actions from "./components/Actions";
import useLocalStorage from "./hooks/useLocalStorage";
import clsx from "clsx";

function App() {
  const { list: stateList, filter, dispatch } = useContext(TodoContext);
  const [list, setList] = useState<Task[]>([]);
  const [animate, setAnimate] = useState<boolean>(false);
  useLocalStorage("list", list);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    if (event.key === "Enter" && currentTarget.value !== "") {
      event.preventDefault();
      dispatch({
        type: "ADD_TASK",
        payload: {
          text: currentTarget.value,
          status: "active",
        },
      });

      currentTarget.value = "";

      if (filter === TaskFilter.active || filter === TaskFilter.all)
        setAnimate(true);
    }
  };

  useEffect(() => {
    let timeoutAnimate = setTimeout(() => {
      setAnimate(false);
    }, 200);
    setList(
      stateList.filter(
        (task) =>
          String(task.status) === String(filter) || filter === TaskFilter.all
      )
    );

    return () => {
      clearTimeout(timeoutAnimate);
    };
  }, [stateList, filter]);

  useEffect(() => {
    setAnimate(true);
  }, []);

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
        <div className={clsx("todo__list", animate && "animate")}>
          <>
            {stateList.length === 0 && (
              <p className="todo__empty">Empty list</p>
            )}

            {stateList.length > 0 && list.length === 0 ? (
              <p className="todo__empty">No results. Apply other filter</p>
            ) : (
              <>
                {list.map((task, index) => (
                  <InputTask index={index} {...task} key={`task-${index}`} />
                ))}
              </>
            )}
            <Actions total={list.length} />
          </>
        </div>
      </div>
    </div>
  );
}

export default App;
