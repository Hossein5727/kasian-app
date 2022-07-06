import React, { useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";

function Layout({ children }) {
  const [isShowNav, setIsShowNav] = useState(true);

  return (
    <div className="bg-bg-home min-h-[100vh] ">
      <div className="fixed top-0 left-0 z-10">
        <Header isShowNav={isShowNav} setIsShowNav={setIsShowNav} />
      </div>
      <div className="flex items-start mt-[73px]">
        <div className={`${isShowNav ? "w-[92vw]" : "w-[100vw]"} `}>
          {children}
        </div>
        <Nav isShowNav={isShowNav} setIsShowNav={setIsShowNav} />
      </div>
    </div>
  );
}

export default Layout;
