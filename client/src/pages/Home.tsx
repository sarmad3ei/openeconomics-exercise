import React, { useEffect, useState } from 'react';
import SpeciesTable from '../components/SpeciesTable';
import { fetchSavedSpecies } from '../services/api';
import { Specie } from '../models/Specie';

const HomePage: React.FC = () => {
  const [species, setSpecies] = useState<Specie[]>([]);

  useEffect(() => {
    fetchSavedSpecies().then(setSpecies).catch(console.error);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Saved Species</h1>
        <SpeciesTable species={species} />
      </header>
    </div>
  );
};

export default HomePage;
