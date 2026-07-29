import React from "react";
import NavbarComponent from "@/pages/components/Navbar/NavbarComponent";

const UserLayout = ({ children }) => {
  return (
    <div>
      <NavbarComponent />
      {children}
    </div>
  );
};

export default UserLayout;