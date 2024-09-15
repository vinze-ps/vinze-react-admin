import React from "react";
// import { IVRAProps } from "@/@types/VinzeAdminPanel.types";
// import { VRAContext } from "@/store/VRAContext";

const Dashboard = React.memo(() => {
  // const { modules }: IVRAProps = useContext(VRAContext).state.VRAProps;

  return (
    <>
      <div style={{ gridColumn: "span 7", gridRow: "span 6" }}></div>
    </>
  );
});

Dashboard.displayName = "Dashboard";

export default Dashboard;
