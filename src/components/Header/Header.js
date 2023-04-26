import React from "react";
import classes from "./Header.module.css";
import Navigation from "./Navigation/Navigation";

const Header = () => {
  return (
    <header className={classes.Header}>
      <div className={['container', classes.flex].join(' ')}>
        <div className={classes.logo}>Mercadona</div>
        <nav>
         <Navigation />
        </nav>
      </div>
    </header>
  );
};

export default Header;
