import React from "react";

export interface IVRA {
  auth: IVRAAuth;
  config: IVRAConfig;
  children?: React.ReactNode;
}

export interface IVRAModule<T> {
  config: IVRAModuleConfig;
  data: T[];
  callbacks: IVRAModuleCallbacks<T>;
  fields: Partial<Record<string, IVRAField>>;
}

export interface IVRAModuleConfig {
  name: string;
  friendlyName?: string;
  icon?: React.ReactNode;
  texts?: Partial<
    Record<
      TVRAModuleContentType,
      {
        title: string;
        description: string;
      }
    >
  >;
}

export interface IVRAField {
  type?: "TEXT" | "TEXTAREA" | "DATE" | "IMAGE" | "TAGS";
  primary?: boolean;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  defaultValue?: any;
  sortable?: boolean;
  validation?: (value: any) => boolean;
  validationMessage?: string;
}

export interface IVRAModuleCallbacks<T> {
  onAdd?: (data: T[], item: any) => void;
  onEdit?: (data: T[], item: T, prevItem: T) => void;
  onDelete?: (data: T[], item: T) => void;
}

export interface IVRAConfig {
  companyName: string;
}

export interface IVRAUserCredentials {
  username: string;
  password: string;
}

export interface IVRAUserData {
  name: string;
}

export type TVRAAuthType = "GOOGLE" | "DEFAULT";

export interface IVRAAuth {
  userData: IVRAUserData | null;
  google?: boolean;
  error?: IVRAError | null;
  onSubmit: (
    type: TVRAAuthType,
    data: IVRAUserCredentials,
  ) => Promise<{ status: boolean }>;
  onLogout: () => void;
}

export interface IVRAError {
  message: string;
}

export interface IVRAReducerState {
  VRAProps: IVRA | null;
  modules: IVRAModule<any>[];
  menu: {
    currentModule: string;
  };
}

export interface IVRAReducerAction {
  type: "SET_VRA_PROPS" | "REGISTER_MODULE" | "SET_CURRENT_MODULE";
  payload: any;
}

export interface IRecordDialogState {
  open: boolean;
  mode: "ADD" | "EDIT";
}

export type TRecordDialogAction =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "SET_MODE"; payload: "ADD" | "EDIT" };

export type TVRAModuleContentType = "DATA_TABLE" | "ADD" | "EDIT" | "DELETE";

// export interface IVRAModuleSettings {
//   navigation: { text: React.ReactNode; icon: React.ReactNode; path: string };
//   texts: Partial<
//     Record<
//       TVRAModuleContentType,
//       {
//         title: string;
//         description: string;
//       }
//     >
//   >;
// }
//
// export type TVRAModulesConstants = Partial<
//   Record<TVRAModuleType, IVRAModuleSettings>
// >;
