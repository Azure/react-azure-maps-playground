import React from "react";
import Sidebar from "./Sidebar";
import PageContent from "./PageContent";
import logo from "../Assets/wired-logo.png";

const Layout: React.FC = () => {
  return (
    <div className="Layout">
      <Header></Header>
      <Sidebar></Sidebar>
      <PageContent></PageContent>
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <header>
      <img src={logo} alt="logo" />
      <h4>React Azure Maps Playground</h4>
    </header>
  );
};

export default Layout;
