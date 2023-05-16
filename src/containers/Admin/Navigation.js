import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Admin.module.css";
import axios from "axios";

const handleLogout = async () => {
  try {
    await axios.get("/logout");
    localStorage.removeItem("admin_session");
    window.location.replace("/");
  } catch (error) {
    console.log(error);
  }
};

const Navigation = () => {
  return (
    <div className="container">
      <h1>dashboard administration</h1>
      <div className={classes.LinksContainer}>
        <ul className={classes.Ul}>
          <li className={classes.NavItem}>
            <NavLink
              to={`${process.env.REACT_APP_BASE_URL}/admin/users`}
              aria-current="page"
              activeClassName="active"
            >
              Créer un utilisateur
            </NavLink>
          </li>
          <li className={classes.NavItem}>
            <NavLink
              to={`${process.env.REACT_APP_BASE_URL}/admin/products`}
              aria-current="page"
              activeClassName="active"
            >
              Produits
            </NavLink>
          </li>
          <li className={classes.NavItem}>
            <NavLink
              to={`${process.env.REACT_APP_BASE_URL}/admin/categories`}
              aria-current="page"
              activeClassName="active"
            >
              Catégories
            </NavLink>
          </li>
          <li className={classes.NavItem}>
            <NavLink
              to={`${process.env.REACT_APP_BASE_URL}/admin/promotions`}
              aria-current="page"
              activeClassName="active"
            >
              Promotions
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout} className={classes.BtnLink}>
              Se déconnecter
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;

