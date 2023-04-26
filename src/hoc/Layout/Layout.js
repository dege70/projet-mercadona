import React from "react";
import Header from "../../components/Header/Header";
import classes from './Layout.module.css'

function Layout(props) {
  return (
    <>
    <Header className={classes.container}/>
        {props.children}
    {/* pied-de-page */}
    </>
  ) 
}

export default Layout;
