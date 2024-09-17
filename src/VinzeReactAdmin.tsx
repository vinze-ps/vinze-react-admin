"use client";
import { IVRA } from "@/@types/VRA.types";
import Login from "@/components/Login/Login";
import "./index.scss";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import Content from "@/components/Content/Content";
import Providers from "./providers/Providers";
import { useEffect } from "react";
// import "dayjs/locale/pl";

const VinzeReactAdmin = (props: IVRA) => {
  useEffect(() => {
    document.querySelector("html")?.classList.add("dark");
    document.querySelector("html")?.setAttribute("data-theme", "DARK");
  }, []);

  return (
    <div
      style={{ height: "100vh", width: "100%" }}
      className={"vinze-react-admin"}
    >
      <div className={"vra-portal-container"}></div>
      <Providers VRAProps={props}>
        <div className={`main-container`}>
          {props.auth.userData !== null ? (
            <>
              <div className="flex flex-row h-full w-full p-4 bg-background">
                <LeftSidebar />
                {/*<Content />*/}
              </div>
            </>
          ) : (
            <Login />
          )}
        </div>
        {props.children}
      </Providers>
    </div>
  );
};

export default VinzeReactAdmin;
