import React, { createContext, useEffect, useReducer } from "react";
import {
  VRAReducer,
  initialVRAState,
} from "@/reducers/vinze-react-admin-reducer";
import {
  IVRAProps,
  IVRAReducerAction,
  IVRAReducerState,
} from "@/@types/VinzeAdminPanel.types";

const initialVRAContext: {
  state: IVRAReducerState;
  dispatch: React.Dispatch<IVRAReducerAction>;
} = {
  state: initialVRAState,
  dispatch: () => {},
};

const VRAContext = createContext(initialVRAContext);

const VRAProvider = (props: {
  children: React.ReactNode;
  VRAProps: IVRAProps;
}) => {
  const { VRAProps } = props;
  const [state, dispatch] = useReducer(VRAReducer, initialVRAState);

  useEffect(() => {
    dispatch({
      type: "SET_VRA_PROPS",
      payload: VRAProps,
    });
  }, [dispatch, VRAProps]);

  return (
    <VRAContext.Provider value={{ state, dispatch }}>
      {state.VRAProps ? props.children : null}
    </VRAContext.Provider>
  );
};

export { VRAContext, VRAProvider };
