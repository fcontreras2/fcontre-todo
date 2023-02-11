import { useContext, MouseEvent } from "react";
import clsx from "clsx";
import { TaskFilter, TaskStatus, TodoContext } from "../provider";

type ActionsProps = {
  total: number;
};

export const Actions = ({ total }: ActionsProps) => {
  const { filter, list, dispatch } = useContext(TodoContext);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { currentTarget } = event;
    dispatch({
      type: "SET_FILTER",
      payload: currentTarget.name,
    });
  };

  const handleClickClear = () => {
    dispatch({
      type: "CLEAR_COMPLETED",
    });
  };

  return (
    <div className="todo__actions">
      <span className="todo__actions-counter">{total} items left</span>
      <div>
        <button
          className={clsx(filter === TaskFilter.all && "active")}
          name={TaskFilter.all}
          onClick={handleClick}
        >
          All
        </button>
        <button
          className={clsx(filter === TaskFilter.active && "active")}
          name={TaskFilter.active}
          onClick={handleClick}
        >
          Active
        </button>
        <button
          className={clsx(filter === TaskFilter.completed && "active")}
          name={TaskFilter.completed}
          onClick={handleClick}
        >
          Completed
        </button>
      </div>
      <button
        disabled={
          list.filter((task) => task.status === TaskStatus.completed).length ===
          0
        }
        onClick={handleClickClear}
      >
        Clear completed
      </button>
    </div>
  );
};

export default Actions;
