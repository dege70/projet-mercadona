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
          <Link to="/admin/products" className={activeTab('/admin/products')}>
            Produits
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/categories" className={activeTab('/admin/categories')}>
            Catégories
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/promotions" className={activeTab('/admin/promotions')}>
            Promotions
          </Link>
        </li>
      </ul>
      <div className="tab-content">
        <div className={activeTab('/admin/products')}>
          <ProductForm />
        </div>
        <div className={activeTab('/admin/categories')}>
          <CategoryForm />
        </div>
        <div className={activeTab('/admin/promotions')}>
          <PromotionForm />
        </div>
      </div>
    </div>
  );
};

export default Admin;
