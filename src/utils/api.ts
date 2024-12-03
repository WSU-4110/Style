import axios from 'axios';
import { auth } from '../firebase-config';

export const getAuthorizedHeaders = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return {};
};

// Example function to fetch user data
export const fetchUserData = async () => {
  try {
    const headers = await getAuthorizedHeaders();
    const response = await axios.get('http://127.0.0.1:8000/api/user-profile/', headers);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
