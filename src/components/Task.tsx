import { DragEvent, memo, useContext, useRef, useState } from "react";

import { Task, TaskFilter, TaskStatus, TodoContext } from "../provider";
import { ReactComponent as IconCheck } from "../icons/ic_check.svg";
import { ReactComponent as IconCircle } from "../icons/ic_circle.svg";
import { ReactComponent as IconArchive } from "../icons/ic_archive.svg";
import clsx from "clsx";

export const InputTask = ({
  text,
  status,
  index,
}: Task & { index: number }) => {
  const { dispatch, filter, dragEndPosition } = useContext(TodoContext);
  const [isDrag, setIsDrag] = useState<boolean>(false);

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

  const dragStart = (event: DragEvent<HTMLDivElement>) => {
    const { currentTarget } = event;
    setIsDrag(true);
    dispatch({
      type: "SET_DRAG_START_POSITION",
      payload: index,
    });
  };

  const dragEnter = (event: DragEvent<HTMLDivElement>) => {
    const { currentTarget } = event;
    dispatch({
      type: "SET_DRAG_END_POSITION",
      payload: index,
    });
    console.log("Enter", index);
  };

  const drangEnd = (event: DragEvent<HTMLDivElement>) => {
    const { currentTarget } = event;
    setIsDrag(false);
    dispatch({
      type: "DRAG_TASK",
    });
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    event.stopPropagation();
    updateState({
      status,
      text: currentTarget.value,
    });
  };

  return (
    <div
      className={clsx(
        "todo__input",
        status === TaskStatus.completed && "active",
        isDrag && "drag",
        dragEndPosition === index && "drag-end"
      )}
      draggable={filter === TaskFilter.all}
      onDragStart={dragStart}
      onDragEnter={dragEnter}
      onDragEnd={drangEnd}
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
        placeholder="Edit your task"
        value={text}
        disabled={status === TaskStatus.completed}
        onChange={handleOnChange}
      />
      <IconArchive className="todo__icon delete" onClick={deleteTask} />
    </div>
  );
};

export default memo(InputTask);
