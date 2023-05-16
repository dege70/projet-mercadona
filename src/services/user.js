import axios from 'axios';
import config from '../config';

export const createAdmin = async (user) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/admin/useradmin/create`, user);
    console.log(response.data.message);
    window.location.href = '/admin'; // Redirige vers la page d'administration après la création de l'utilisateur
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/user/create`, user);
    console.log(response.data.message);
    window.location.href = '/'; // Redirige vers la page d'administration après la création de l'utilisateur
  } catch (error) {
    console.error(error);
  }
};

// export const authenticateUser = async (user) => {
//   try {
//     const response = await axios.post(`${config.API_BASE_URL}/user/authenticate`, user);
//     console.log(response.data.message);
//     // Gérer la redirection ou les actions supplémentaires après l'authentification de l'utilisateur non-administrateur
//     window.location.href = '/catalogue'
//   } catch (error) {
//     console.error(error);
//   }
// };

export const authenticateUser = async (user) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/user/authenticate`, user);
    console.log(response.data.message);
    return response; // Renvoyer la réponse complète
  } catch (error) {
    console.error(error);
    throw error; // Lancer l'erreur pour la gérer en aval
  }
};
