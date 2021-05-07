import React, { useReducer } from "react";
import { AlertContext } from "./alertContext";
import { AlertReducer } from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = null;
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  /// methods actions setAlert()
  const setAlert = (msz, type) => {
    dispatch({ type: SET_ALERT, payload: { msz, type } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 2000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
      }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
