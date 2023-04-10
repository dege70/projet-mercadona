import React from "react";
import Navigation from "./Navigation/Navigation";

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header>
      <h1>Mercadona</h1>
      <Navigation />
    </header>
  );
};

export default Header;
