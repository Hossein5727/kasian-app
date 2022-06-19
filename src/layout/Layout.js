import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";

function Layout({ children }) {
  return (
    <div className="bg-bg-home ">
      <Header />
      <div className="flex items-start">
        <div className="w-[92vw] ">{children}</div>
        <Nav />
      </div>
    </div>
  );
}

export default Layout;
