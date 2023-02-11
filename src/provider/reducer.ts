import { Task, TodoState } from "./index";

type Action = {
  type: string;
  payload: any;
};

const reducer = (state: TodoState, action: Action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    case "UPDATE_TASK": {
      const nextList = [...state.list];
      nextList[action.payload.index] = action.payload.value;
      return {
        ...state,
        list: nextList,
      };
    }

    case "DELETE_TASK": {
      const nextList = [...state.list];
      nextList.splice(action.payload.index, 1);
      return {
        ...state,
        list: nextList,
      };
    }

    case "SET_DRAG_START_POSITION": { 

      console.log("SET_DRAG_INIT_POSITION", action.payload)
      return {
        ...state,
        dragStartPosition: action.payload
      }
    }

    case "SET_DRAG_END_POSITION": { 

      console.log("SET_DRAG_END_POSITION", action.payload)
      return {
        ...state,
        dragEndPosition: action.payload
      }
    }

    case "DRAG_TASK": {
      const { dragStartPosition, dragEndPosition } = state;

      const nextList = [...state.list];
      const taskToMove = nextList[dragStartPosition as number];
      nextList.splice(dragStartPosition as number, 1);
      nextList.splice(dragEndPosition as number, 0, taskToMove);

      return {
        ...state,
        list: nextList,
        dragStartPosition: null,
        dragEndPosition: null,
      };
    }

    default:
      return state;
  }
};

export default reducer;
