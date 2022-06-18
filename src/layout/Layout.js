import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="flex items-start">
        {children}
        <Nav />
      </div>
    </div>
  );
}

export default Layout;
