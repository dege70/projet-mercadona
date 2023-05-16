import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <ul className={classes.Navigation}>
      <li className={classes.NavigationItem}>
        <NavLink exact to="/" aria-current="page">
          Accueil
        </NavLink>
      </li>
      <li className={classes.NavigationItem}>
        <NavLink to="/catalogue" aria-current="page">
          Catalogue
        </NavLink>
      </li>
      <li className={classes.NavigationItem}>
        <NavLink to="/dashboard" aria-current="page">
          Espace Administrateur
        </NavLink>
      </li>
      <li className={classes.NavigationItem}>
        <NavLink to="/seconnecter" aria-current="page">
          COMPTE
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
