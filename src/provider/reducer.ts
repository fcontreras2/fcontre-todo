import { Task } from "./index";

type Action = {
  type: string;
  payload: any;
};

const reducer = (state: Task[], action: Action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    case "UPDATE_TASK": {
      const nextState = [...state];
      nextState[action.payload.index] = action.payload.value;
      return [
        ...nextState,
      ]
    }

    case "DELETE_TASK": {
      const nextState = [...state];
      nextState.splice(action.payload.index, 1)
      return [
        ...nextState,
      ]
    }
    default:
      return state;
  }
};

export default reducer;
