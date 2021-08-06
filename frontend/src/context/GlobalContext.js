import { createContext } from "react";
import globalActions from "./actions/globalActions";

export const INITIAL_STATE = {
  isLoading: false,
};

export const GlobalStateContext = createContext({
  state: INITIAL_STATE,
  dispatch: () => {},
});

export const globalReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case globalActions.SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
