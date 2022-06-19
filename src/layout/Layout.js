import React, { useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";

function Layout({ children }) {
  const [isShowNav, setIsShowNav] = useState(true);

  return (
    <div className="bg-bg-home ">
      <Header isShowNav={isShowNav} setIsShowNav={setIsShowNav} />
      <div className="flex items-start">
        <div className={`${isShowNav ? "w-[92vw]" : "w-[100vw]"} `}>
          {children}
        </div>
        <Nav isShowNav={isShowNav} setIsShowNav={setIsShowNav} />
      </div>
    </div>
  );
}

export default Layout;
