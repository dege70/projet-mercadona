import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import CategoryForm from './CategoryForm';
import ProductForm from '../../components/Form/ProductForm';
import PromotionForm from '../../components/Form/PromotionForm';

const Admin = () => {
  const { pathname } = useLocation();

  const activeTab = (path) => {
    if (path === pathname) {
      return 'nav-link active';
    } else {
      return 'nav-link';
    }
  };

  return (
    <div className="container">
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <Link to={`${process.env.REACT_APP_BASE_URL}/admin/products`} className={activeTab(`${process.env.REACT_APP_BASE_URL}/admin/products`)}>
            Produits
          </Link>
        </li>
        <li className="nav-item">
          <Link to={`${process.env.REACT_APP_BASE_URL}/admin/categories`} className={activeTab(`${process.env.REACT_APP_BASE_URL}/admin/categories`)}>
            Catégories
          </Link>
        </li>
        <li className="nav-item">
          <Link to={`${process.env.REACT_APP_BASE_URL}/admin/promotions`} className={activeTab(`${process.env.REACT_APP_BASE_URL}/admin/promotions`)}>
            Promotions
          </Link>
        </li>
      </ul>
      <div className="tab-content">
        <div className={activeTab(`${process.env.REACT_APP_BASE_URL}/admin/products`)}>
          <ProductForm />
        </div>
        <div className={activeTab(`${process.env.REACT_APP_BASE_URL}/admin/categories`)}>
          <CategoryForm />
        </div>
        <div className={activeTab(`${process.env.REACT_APP_BASE_URL}/admin/promotions`)}>
          <PromotionForm />
        </div>
      </div>
    </div>
  );
};

export default Admin;
