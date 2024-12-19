import React, { createContext, useEffect, useReducer } from "react";
import {
  VRAReducer,
  initialVRAState,
} from "@/reducers/vra-reducer.ts";
import {
  IRecordDialogState,
  IVRA,
  IVRAReducerAction,
  IVRAReducerState,
  TRecordDialogAction,
} from "@/types/VRA.types";
import {
  initialRecordDialogState,
  recordDialogReducer,
} from "@/reducers/record-dialog-reducer.ts";

const initialVRAContext: {
  state: IVRAReducerState;
  dispatchVRA: React.Dispatch<IVRAReducerAction>;
  recordDialogState: IRecordDialogState;
  dispatchRecordDialog: React.Dispatch<TRecordDialogAction>;
} = {
  state: initialVRAState,
  dispatchVRA: () => {},
  recordDialogState: initialRecordDialogState,
  dispatchRecordDialog: () => {},
};

const VRAContext = createContext(initialVRAContext);

const VRAProvider = (props: { children: React.ReactNode; VRAProps: IVRA }) => {
  const { VRAProps } = props;
  const [state, dispatchVRA] = useReducer(VRAReducer, initialVRAState);
  const [recordDialogState, dispatchRecordDialog] = useReducer(
    recordDialogReducer,
    initialRecordDialogState,
  );

  useEffect(() => {
    dispatchVRA({
      type: "SET_VRA_PROPS",
      payload: VRAProps,
    });
  }, [dispatchVRA, VRAProps]);

  return (
    <VRAContext.Provider
      value={{ state, dispatchVRA, recordDialogState, dispatchRecordDialog }}
    >
      {state.VRAProps ? props.children : null}
    </VRAContext.Provider>
  );
};

export { VRAContext, VRAProvider };
