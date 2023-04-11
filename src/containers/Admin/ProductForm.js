import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useCatalog } from "../../hooks/useFetch";
import { createProduct, updateProduct } from "../../services/products";

const ProductForm = ({ product }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const { categories } = useCatalog();
  const history = useHistory();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setImage(product.image);
    }
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      name,
      description,
      price: parseFloat(price),
      category,
      image,
    };

    try {
      if (product) {
        await updateProduct(product.id, data);
      } else {
        await createProduct(data);
      }
      history.push("/catalogue");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>Prix</Form.Label>
        <Form.Control
          type="number"
          min="0.01"
          step="0.01"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="category">
        <Form.Label>Catégorie</Form.Label>
        <Form.Control
          as="select"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          required
        >
          <option value="">Choisissez une catégorie...</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="text"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        {product ? "Modifier" : "Ajouter"}
      </Button>
    </Form>
  );
};

export default ProductForm;
