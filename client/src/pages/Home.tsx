import React, { useEffect, useState } from 'react';
import SpeciesTable from '../components/SpeciesTable';
import { Specie } from '../models/Specie';
import { fetchSavedSpecies } from '../services/api';

const HomePage: React.FC = () => {
  const [species, setSpecies] = useState<Specie[]>([]);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const data = await fetchSavedSpecies();
        setSpecies(data);
      } catch (error) {
        console.error('Error fetching species:', error);
      }
    };

    fetchSpecies();
  }, []);

  return (
    <div className="home-page">
      <h1>Species Data</h1>
      <SpeciesTable species={species} />
    </div>
  );
};

export default HomePage;
