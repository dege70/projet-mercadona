import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import HomePage from "./containers/Home/HomePage";
import Catalogue from "./containers/Catalogue/Catalogue";
import Admin from "./containers/Admin/Admin";
import PrivateRoute from "./components/Shared/PrivateRoute";
import Error from "./components/Error/Error";
import Login from "./containers/Auth/Login";
import Connect from "./containers/Admin/Connect";
import ProductForm from "./components/Form/ProductForm";
import CategoryForm from "./components/Form/CategoryForm";
import PromotionForm from "./components/Form/PromotionForm";


function App() {
  return (
    <Router>
        <div className="App">
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/dashboard" element={<PrivateRoute><Connect /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} exact />
              <Route path="/admin/products" element={<ProductForm />} exact />
              <Route path="/admin/categories" element={<CategoryForm />} exact />
              <Route path="/admin/promotions" element={<PromotionForm />} exact />
              <Route path="*" element={<Error message="404 - Page not found" />} />
            </Routes>
          </Layout> 
        </div>
    </Router>
  );
}

export default App;
