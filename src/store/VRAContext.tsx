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
  dispatchVRA: React.Dispatch<IVRAReducerAction>;
} = {
  state: initialVRAState,
  dispatchVRA: () => {},
};

const VRAContext = createContext(initialVRAContext);

const VRAProvider = (props: {
  children: React.ReactNode;
  VRAProps: IVRAProps;
}) => {
  const { VRAProps } = props;
  const [state, dispatchVRA] = useReducer(VRAReducer, initialVRAState);

  useEffect(() => {
    dispatchVRA({
      type: "SET_VRA_PROPS",
      payload: VRAProps,
    });
  }, [dispatchVRA, VRAProps]);

  return (
    <VRAContext.Provider value={{ state, dispatchVRA }}>
      {state.VRAProps ? props.children : null}
    </VRAContext.Provider>
  );
};

export { VRAContext, VRAProvider };
