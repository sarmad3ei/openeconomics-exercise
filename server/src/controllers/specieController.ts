import { Request, Response } from 'express';
import { saveSpecies, getAllSpecies  } from '../services/dbService';
import { fetchRegions, getRandomRegion, fetchSpeciesByRegion, filterCriticallyEndangered, filterMammals } from '../services/apiService';

export const getSpeciesData = async (req: Request, res: Response) => {
  try {
    const regions = await fetchRegions();
    const randomRegion = getRandomRegion(regions);
    
    const speciesList = await fetchSpeciesByRegion(randomRegion.identifier);
    const criticallyEndangeredSpecies = await filterCriticallyEndangered(speciesList);
    const mammals = filterMammals(speciesList);

    for (const species of criticallyEndangeredSpecies.slice(0, 15)) {
      await saveSpecies(species);
    }

    res.json({
      criticallyEndangered: criticallyEndangeredSpecies,
      mammals
    });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSavedSpecies = async (req: Request, res: Response) => {
  try {
    const speciesList = await getAllSpecies();
    res.json(speciesList);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};