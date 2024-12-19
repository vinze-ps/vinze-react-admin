import { IRecordDialogState, TRecordDialogAction } from "@/types/VRA.types";

export const initialRecordDialogState: IRecordDialogState = {
  open: false,
  mode: "ADD",
};

export const recordDialogReducer = (
  state: IRecordDialogState,
  action: TRecordDialogAction,
): IRecordDialogState => {
  switch (action.type) {
    case "OPEN":
      return { ...state, open: true };
    case "CLOSE":
      return { ...state, open: false };
    case "SET_MODE":
      return { ...state, mode: action.payload };
    default:
      throw new Error();
  }
};
