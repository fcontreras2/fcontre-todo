import { createContext, useReducer } from "react";
import reducer from "./reducer";

export enum TaskStatus {
  "active" = "active",
  "completed" = "completed",
}

export type Task = {
  text: string;
  status: TaskStatus;
};

const initialState: Task[] = [];

export const TodoContext = createContext<{
  list: Task[];
  dispatch: React.Dispatch<any>;
}>({
  list: initialState,
  dispatch: () => null,
});

type Props = {
  children: JSX.Element;
};

const TodoProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TodoContext.Provider value={{ list:state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
