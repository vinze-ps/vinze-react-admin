import React from "react";
import Logo from "@/assets/images/logo.svg";

const TopBar = () => {
  return (
    <div className={"w-full p-4 border-b-zinc-700 border-b-1 bg-zinc-900"}>
      <div className={"px-2"}>
        <img src={Logo} alt="logo" className="w-[4rem] h-auto" />
      </div>
    </div>
  );
};

export default TopBar;
