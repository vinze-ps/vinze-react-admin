import React, { useContext, useReducer } from "react";
import { VRAContext } from "@/store/VRAContext";
import { DisplayDefault } from "./cards/DataTableCard";
import DialogAddEdit from "../../components/dialogs/DialogAddEdit";
import {
  IVRADialogAddEditState,
  IVRAProps,
  TVRADialogAddEditAction,
} from "@/@types/VinzeAdminPanel.types";

const Content = React.memo(() => {
  const [dialogAddEditState, dispatchDialogAddEdit] = useReducer(
    (state: IVRADialogAddEditState, action: TVRADialogAddEditAction) => {
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
    },
    { open: false, mode: "ADD", originalItem: null } as IVRADialogAddEditState,
  );
  const { state } = useContext(VRAContext);

  if (!state.VRAProps) return null;

  const { currentModuleType } = state.menu;
  const { modules }: IVRAProps = state.VRAProps;
  const currentModule = modules[currentModuleType];

  return (
    <>
      {currentModule && (
        <DialogAddEdit
          dialogAddEditState={dialogAddEditState}
          dispatchDialogAddEdit={dispatchDialogAddEdit}
          currentModule={currentModule}
        />
      )}
      <div className="ps-4 relative flex-1 overflow-auto">
        {/*<div className="absolute w-full h-full opacity-[0.15] left-0 top-0"></div>*/}
        {/*{currentModule?.config.content.map((c, index) => (*/}
        {/*  <Card className="w-full border-none p-0" key={index}>*/}
        {/*    {c.type === "DISPLAY" ? (*/}
        {/*      <DisplayDefault*/}
        {/*        dispatchDialogAddEdit={dispatchDialogAddEdit}*/}
        {/*        currentModule={currentModule}*/}
        {/*      />*/}
        {/*    ) : c.type === "ADD" ? (*/}
        {/*      <AddDefault currentModule={currentModule} />*/}
        {/*    ) : c.type === "EDIT" ? (*/}
        {/*      <EditDefault currentModule={currentModule} />*/}
        {/*    ) : c.type === "DELETE" ? (*/}
        {/*      <DeleteDefault currentModule={currentModule} />*/}
        {/*    ) : (*/}
        {/*      <React.Fragment key={index}></React.Fragment>*/}
        {/*    )}*/}
        {/*  </Card>*/}
        {/*))}*/}
        {currentModule && (
          <DisplayDefault
            dispatchDialogAddEdit={dispatchDialogAddEdit}
            currentModule={currentModule}
          />
        )}
        {/* {currentModule === "DASHBOARD" && <Dashboard />}
      {currentModule === "BLOG" && !!cards.find((m) => m.name === "BLOG") && <Blog />}
      {currentModule === "MEDIA" && !!cards.find((m) => m.name === "MEDIA") && (
        <Media style={{ gridColumn: "span 12", gridRow: "span 10" }} />
      )}
      {currentModule === "COMMENTS" && !!cards.find((m) => m.name === "COMMENTS") && <Comments />} */}
      </div>
    </>
  );
});

Content.displayName = "Content";

export default Content;
