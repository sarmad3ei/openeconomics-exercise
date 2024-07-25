import axios from 'axios';
import { Specie } from '../models/Specie';

export const fetchSavedSpecies = async (): Promise<Specie[]> => {
  const response = await axios.get('http://localhost:3000/api/species/saved');
  return response.data;
};
