import Header from "components/Header";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col mx-auto p-4 container h-screen">
      <Header />
      <div className="flex-1">{children}</div>
      <footer>
        <p>@lucasdrem - 2022</p>
      </footer>
    </div>
  );
};

export default Layout;
