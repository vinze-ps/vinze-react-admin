import { IVRAReducerAction, IVRAReducerState } from "@/types/VRA.types";

export const initialVRAState: IVRAReducerState = {
  VRAProps: null,
  modules: [],
  menu: {
    currentModule:
      (typeof window !== "undefined" &&
        localStorage.getItem("vra-menu-current-module-type")) ||
      "DASHBOARD",
  },
};

export const VRAReducer = (
  state: IVRAReducerState,
  action: IVRAReducerAction,
): IVRAReducerState => {
  switch (action.type) {
    case "SET_CURRENT_MODULE":
      typeof window !== "undefined" &&
        localStorage.setItem(
          "vra-menu-current-module-type",
          action.payload?.toString(),
        );
      return {
        ...state,
        menu: { ...state.menu, currentModule: action.payload },
      };
    case "REGISTER_MODULE":
      return {
        ...state,
        modules: state.modules.find(
          (module) => module.config.name === action.payload.config.name,
        )
          ? state.modules.map((module) =>
              module.config.name === action.payload.config.name ? action.payload : module,
            )
          : [...state.modules, action.payload],
      };
    case "SET_VRA_PROPS":
      return { ...state, VRAProps: action.payload };
    default:
      return state;
  }
};
