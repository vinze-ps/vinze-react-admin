"use client";
import { IVRAProps } from "@/@types/VinzeAdminPanel.types";
import Login from "@/components/Login/Login";
import "./index.scss";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import Content from "@/components/Content/Content";
// import "dayjs/locale/pl";
import Providers from "./providers/Providers";
import { useEffect } from "react";

const VinzeReactAdmin = (props: IVRAProps) => {
  useEffect(() => {
    document.querySelector("html")?.classList.add("dark");
    document.querySelector("html")?.setAttribute("data-theme", "DARK");
  }, []);

  return (
    <div className={"vinze-react-admin"}>
      <Providers VRAProps={props}>
        <div className={`main-container`}>
          {props.auth.userData !== null ? (
            <>
              <div className="flex flex-row h-full w-full p-4 bg-background">
                <LeftSidebar />
                <Content />
              </div>
            </>
          ) : (
            <Login />
          )}
        </div>
      </Providers>
    </div>
  );
};

export default VinzeReactAdmin;
