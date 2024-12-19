"use client";
import { IVRA } from "@/types/VRA.types";
import Login from "@/components/layout/Login.tsx";
import "./assets/styles/index.scss";
import LeftSidebar from "@/components/layout/LeftSidebar.tsx";
import Content from "@/components/layout/content/Content.tsx";
import Providers from "./providers/Providers";
import { useEffect } from "react";
import TopBar from "@/components/layout/TopBar.tsx";
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
              <TopBar />
              <div className="flex flex-row h-full w-full bg-zinc-900">
                <LeftSidebar />
                <Content />
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
