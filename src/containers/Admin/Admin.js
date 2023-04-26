import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import CategoryForm from '../../components/Form/CategoryForm';
import ProductForm from '../../components/Form/ProductForm';
import PromotionForm from '../../components/Form/PromotionForm';
import classes from '../Admin/Admin.module.css'
import axios from 'axios';

const Admin = () => {
  const matchProducts = useMatch(`${process.env.REACT_APP_BASE_URL}/admin/products`);
  const matchCategories = useMatch(`${process.env.REACT_APP_BASE_URL}/admin/categories`);
  const matchPromotions = useMatch(`${process.env.REACT_APP_BASE_URL}/admin/promotions`);

  const handleLogout = async () => {
    try {
      await axios.get('/logout');
      localStorage.removeItem('session');
      window.location.replace('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <h1>DASHBOARD ADMINISTRATION</h1>
      <ul className={classes.Ul}>
        <li className={classes.NavItem}>
          <Link to={`${process.env.REACT_APP_BASE_URL}/admin/products`} className={matchProducts ? 'nav-link active' : 'nav-link'}>
            Produits
          </Link>
        </li>
        <li className={classes.NavItem}>
          <Link to={`${process.env.REACT_APP_BASE_URL}/admin/categories`} className={matchCategories ? 'nav-link active' : 'nav-link'}>
            Catégories
          </Link>
        </li>
        <li className={classes.NavItem}>
          <Link to={`${process.env.REACT_APP_BASE_URL}/admin/promotions`} className={matchPromotions ? 'nav-link active' : 'nav-link'}>
            Promotions
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className={classes.BtnLink}>Se déconnecter</button>
        </li>
      </ul>
      <div className="tab-content">
        {matchProducts && (
          <div className="active">
            <ProductForm />
          </div>
        )}
        {matchCategories && (
          <div className="active">
            <CategoryForm />
          </div>
        )}
        {matchPromotions && (
          <div className="active">
            <PromotionForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
