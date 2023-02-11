import { createContext, useReducer } from "react";
import reducer from "./reducer";

export enum TaskStatus {
  "active" = "active",
  "completed" = "completed",
}

export enum TaskFilter {
  "all" = "all",
  "active" = "active",
  "completed" = "completed",
}

export type Task = {
  text: string;
  status: TaskStatus;
};

export type TodoState = {
  list: Task[];
  filter: TaskFilter;
  dragStartPosition: number | null;
  dragEndPosition: number | null;
};

const initialState: TodoState = {
  filter: TaskFilter.all,
  dragStartPosition: null,
  dragEndPosition: null,
  list: [],
};

export const TodoContext = createContext<
  {
    dispatch: React.Dispatch<any>;
  } & TodoState
>({
  dispatch: () => null,
  ...initialState,
});

type Props = {
  children: JSX.Element;
};

const TodoProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TodoContext.Provider value={{ dispatch, ...state }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
