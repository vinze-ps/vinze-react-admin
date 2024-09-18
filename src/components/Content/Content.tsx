import React, { useContext, useReducer } from "react";
import { VRAContext } from "@/store/VRAContext";
import DialogAddEdit from "../../components/dialogs/DialogAddEdit";
import {
  IVRADialogAddEditState,
  TVRADialogAddEditAction,
} from "@/@types/VRA.types";
import { TableView } from "@/components/Content/views/TableView.tsx";

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
  const { modules, menu } = state;
  const { currentModule } = menu;
  const module = modules.find((m) => m.config.name === currentModule);

  return (
    <>
      {module && (
        <DialogAddEdit
          dialogAddEditState={dialogAddEditState}
          dispatchDialogAddEdit={dispatchDialogAddEdit}
          module={module}
        />
      )}
      <div className="p-4 relative flex-1 overflow-auto">
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
        {module && (
          <TableView
            dispatchDialogAddEdit={dispatchDialogAddEdit}
            module={module}
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
