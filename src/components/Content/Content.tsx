import React, { useContext } from "react";
import { VRAContext } from "@/store/VRAContext";
import RecordDialog from "../dialogs/RecordDialog.tsx";
import { TableView } from "@/components/Content/views/TableView.tsx";

const Content = React.memo(() => {
  const { state } = useContext(VRAContext);
  const { modules, menu } = state;
  const { currentModule } = menu;
  const module = modules.find((m) => m.config.name === currentModule);

  return (
    <>
      {module && <RecordDialog module={module} />}
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
        {module && <TableView module={module} />}
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
