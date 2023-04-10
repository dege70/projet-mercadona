import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./containers/Home/HomePage";
import Catalogue from "./containers/Catalogue/Catalogue";
import Admin from "./containers/Admin/Admin";
import Login from "./containers/Auth/Login";
import PrivateRoute from "./components/Shared/PrivateRoute";
import Error from "./components/Error/Error";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<PrivateRoute><Admin /></PrivateRoute>} />
          <Route path="*" element={<Error message="404 - Page not found" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
