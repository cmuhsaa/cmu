import {
  AUTH_SUCCESS,
  CLEAR_MESSAGE,
  CLEAR_PATH,
  LOADING_END,
  LOADING_START,
  MESSAGE,
} from "./constant";

const initialState = {
  message: {},
  path: "",
  role: "",
  authenticated: false,
  isLoading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        isLoading: true,
      };
    case LOADING_END:
      return {
        ...state,
        isLoading: false,
      };
    case MESSAGE:
      return {
        ...state,
        message: {
          message: action.payload.message,
          status: action.payload.status,
        },
        path: action.payload.path,
      };
    case CLEAR_PATH:
      return {
        ...state,
        path: "",
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: {},
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        authenticated: true,
      };
    default:
      return state;
  }
};
