import React from "react";

export interface IVRAProps {
  callbacks: IVRACallbacks;
  modules: Partial<Record<TVRAModuleType, IVRAModule>>;
  auth: IVRAAuth;
  config: IVRAConfig;
}

export interface IVRAModule {
  data: any[];
  fields: Partial<Record<string, IVRAField>>;
}

export interface IVRAField {
  type?: "TEXT" | "TEXTAREA" | "DATE" | "IMAGE" | "TAGS";
  primary?: boolean;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  defaultValue?: any;
  validation?: (value: any) => boolean;
  validationMessage?: string;
}

export interface IVRACallbacks {
  collection: IVRACollectionCallbacks;
}

export interface IVRACollectionCallbacks {
  onAdd?: (type: TVRAModuleType, data: any[], item: any) => void;
  onEdit?: (
    type: TVRAModuleType,
    data: any[],
    item: any,
    prevItem: any,
  ) => void;
  onDelete?: (type: TVRAModuleType, data: any[], item: any) => void;
}

export interface IVRASettingsCallbacks {
  onSave?: (data: any[], item: any) => void;
}

export interface IVRAConfig {
  companyName: string;
}

export type TVRAModuleType =
  | "DASHBOARD"
  | "BLOG"
  | "MEDIA"
  | "COMMENTS"
  | "USERS"
  | "SHOP"
  | "NOTIFICATIONS"
  | "SETTINGS";

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
  VRAProps: IVRAProps | null;
  menu: {
    currentModuleType: TVRAModuleType;
  };
}

export interface IVRAReducerAction {
  type: "SET_VRA_PROPS" | "SET_CURRENT_MODULE_TYPE";
  payload: any;
}

export interface IVRADialogAddEditState {
  open: boolean;
  mode: "ADD" | "EDIT";
}

export type TVRADialogAddEditAction =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "SET_MODE"; payload: "ADD" | "EDIT" };

export type TVRAModuleContentType = "DATA_TABLE" | "ADD" | "EDIT" | "DELETE";

export type TVRAModuleConstants = Record<
  TVRAModuleType,
  {
    navigation: { icon: React.JSX.Element; text: string; path: string };
    texts: Partial<
      Record<
        TVRAModuleContentType,
        { title: string; description: string; addNew?: string }
      >
    >;
  }
>;

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
