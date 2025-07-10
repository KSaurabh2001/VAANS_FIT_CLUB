import {
  ADD_CLASS,
  ALL_CLASS,
  ASSIGN_CLASS,
  ASSIGN_TRAINER,
  DELETE_CLASS,
  EDIT_CLASS,

  GET_CLASS_BY_ID,
  UNASSIGN_CLASS,
  UNASSIGN_TRAINER,
  VERIFY_PAYMENT,
} from "./ActionType";

const initialState = {
  allClasses: [],
  classById: null,
  userById: null,
  trainerById: null
};

const HandlerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_CLASS:
      return {
        ...state,
        allClasses: payload,
      };

    case ADD_CLASS:
      return {
        ...state,
        allClasses: payload
      };

    case DELETE_CLASS:
      return {
        ...state,
        allClasses: payload
      };

    case EDIT_CLASS:
      return {
        ...state,
        allClasses: payload
      };

    case GET_CLASS_BY_ID:
      return {
        ...state,
        classById: payload,
      };

    case ASSIGN_TRAINER:
      return { ...state };
    case UNASSIGN_TRAINER:
      return { ...state }

    case ASSIGN_CLASS:
      return { ...state };
    case UNASSIGN_CLASS:
      return { ...state }
    

    default:
      return state;
  }
};

export default HandlerReducer;
