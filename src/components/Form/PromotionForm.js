import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPromotion } from '../../services/promotions';
import { getProducts } from '../../services/product';
import classes from "../../hoc/Layout/Layout.module.css";
import Admin from '../../containers/Admin/Admin';

const PromotionForm = () => {
  const [formData, setFormData] = useState({
    produit: '',
    pourcentage: '',
    datedebut: '',
    datefin: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adapter le format de la date de début au format ISO 8601
      const formattedDateDebut = new Date(formData.datedebut).toISOString().split("T")[0];
  
      // Adapter le format de la date de fin au format ISO 8601
      const formattedDateFin = new Date(formData.datefin).toISOString().split("T")[0];
  
      await addPromotion({
        produit: formData.produit,
        pourcentage: formData.pourcentage,
        datedebut: formattedDateDebut, // Utiliser le format ISO 8601
        datefin: formattedDateFin // Utiliser le format ISO 8601
      });
      navigate('/admin');
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

  const handleDateDebutChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      datedebut: formattedDate
    }));
  };

  const handleDateFinChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      datefin: formattedDate
    }));
  };

  return (
    <div className="container">
      <Admin />
      <h1>Ajouter une Promotion</h1>
      <form onSubmit={handleSubmit} className={classes.FormBox}>
        <div className={classes.Input}>
          <label htmlFor="produit">Produit concerné</label>
          <select name="produit" value={formData.produit} onChange={handleChange}>
            <option value="">-- Sélectionner un produit --</option>
            {products.map((product) => (
              <option key={product.idproduit} value={product.idproduit}>
                {product.libelle}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.Input}>
          <label htmlFor="pourcentage">Réduction (en %)</label>
          <input
            type="number"
            name="pourcentage"
            min={0}
            max={100}
            value={formData.pourcentage}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.Input}>
          <label htmlFor="datedebut">Date de début</label>
          <input
            type="date"
            name="datedebut"
            value={formData.datedebut}
            onChange={handleDateDebutChange}
            required
          />
        </div>
        <div className={classes.Input}>
          <label htmlFor="datefin">Date de fin</label>
          <input
            type="date"
            name="datefin"
            value={formData.datefin}
            onChange={handleDateFinChange}
            required
          />
        </div>
        <div className={classes.submit}>
          <input
          type="submit"
          disabled={isLoading} value={isLoading ? 'Chargement...' : 'Ajouter la promotion'} />
        </div>
        
      </form>
    </div>
  );
};

export default PromotionForm;
