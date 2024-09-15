import {
  IVRAReducerAction,
  IVRAReducerState,
  TVRAModuleType,
} from "@/@types/VinzeAdminPanel.types";

export const initialVRAState: IVRAReducerState = {
  VRAProps: null,
  menu: {
    currentModuleType:
      (typeof window !== "undefined" &&
        (localStorage.getItem(
          "vra-menu-current-module-type",
        ) as TVRAModuleType)) ||
      "DASHBOARD",
  },
};

export const VRAReducer = (
  state: IVRAReducerState,
  action: IVRAReducerAction,
): IVRAReducerState => {
  switch (action.type) {
    case "SET_CURRENT_MODULE_TYPE":
      typeof window !== "undefined" &&
        localStorage.setItem(
          "vra-menu-current-module-type",
          action.payload?.toString(),
        );
      return {
        ...state,
        menu: { ...state.menu, currentModuleType: action.payload },
      };
    case "SET_VRA_PROPS":
      return { ...state, VRAProps: action.payload };
    default:
      return state;
  }
};
