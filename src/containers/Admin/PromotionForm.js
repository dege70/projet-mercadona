import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addPromotion } from '../../services/promotions';

const PromotionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    discount: '',
    start_date: '',
    end_date: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPromotion(formData);
      navigate('/admin/promotions');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div>
      <h1>Ajouter une promotion</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDiscount">
          <Form.Label>Réduction (en %)</Form.Label>
          <Form.Control
            type="number"
            name="discount"
            min={0}
            max={100}
            value={formData.discount}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicStartDate">
          <Form.Label>Date de début</Form.Label>
          <Form.Control
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEndDate">
          <Form.Label>Date de fin</Form.Label>
          <Form.Control
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Ajouter la promotion
        </Button>
      </Form>
    </div>
  );
};

export default PromotionForm;
