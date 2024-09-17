import React from "react";
// import { IVRA } from "@/@types/VRA.types";
// import { VRAContext } from "@/store/VRAContext";

const Dashboard = React.memo(() => {
  // const { modules }: IVRA = useContext(VRAContext).state.VRAProps;

  return (
    <>
      <div style={{ gridColumn: "span 7", gridRow: "span 6" }}></div>
    </>
  );
});

Dashboard.displayName = "Dashboard";

export default Dashboard;
