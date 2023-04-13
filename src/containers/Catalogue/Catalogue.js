import React from "react";
import useFetch from "../../hooks/useFetch";
import ProductList from "../../components/Catalogue/ProductList";
import CategoryFilter from "../../components/Catalogue/CategoryFilter";
import Loading from "../../components/Shared/Loading";
import Error from "../../components/Error/Error";

const Catalogue = () => {
  const { data: products, isLoading, error } = useFetch("api/products");

  const [category, setCategory] = React.useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <div className="container">
      <CategoryFilter value={category} onChange={handleCategoryChange} />
      <ProductList products={products} category={category} />
    </div>
  );
};

export default Catalogue;
