import { memo, useContext } from "react";

import { Task, TaskStatus, TodoContext } from "../provider";
import { ReactComponent as IconCheck } from "../icons/ic_check.svg";
import { ReactComponent as IconCircle } from "../icons/ic_circle.svg";
import { ReactComponent as IconArchive } from "../icons/ic_archive.svg";

export const InputTask = ({
  text,
  status,
  index,
}: Task & { index: number }) => {
  const { dispatch } = useContext(TodoContext);

  const updateState = (task: Task) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        index,
        value: {
          text: task.text,
          status: task.status,
        },
      },
    });
  };

  const deleteTask = () => {
    dispatch({
      type: "DELETE_TASK",
      payload: {
        index,
      },
    });
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    updateState({
      status,
      text: currentTarget.value,
    });
  };

  return (
    <div
      className={`todo__input ${
        status === TaskStatus.completed ? "active" : ""
      }`}
    >
      {status === TaskStatus.completed ? (
        <IconCheck
          className="todo__icon"
          onClick={() => updateState({ text, status: TaskStatus.active })}
        />
      ) : (
        <IconCircle
          className="todo__icon"
          onClick={() => updateState({ text, status: TaskStatus.completed })}
        />
      )}
      <input
        placeholder="Ingresa tu actividad"
        value={text}
        disabled={status === TaskStatus.completed}
        onChange={handleOnChange}
      />
      <IconArchive className="todo__icon delete" onClick={deleteTask} />
    </div>
  );
};

export default memo(InputTask);
