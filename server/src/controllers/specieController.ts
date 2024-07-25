import { Request, Response } from 'express';
import { saveSpecies, getAllSpecies  } from '../services/dbService';
import { fetchRegions, getRandomRegion, fetchSpeciesByRegion, filterCriticallyEndangered, filterMammals } from '../services/apiService';

export const getSpeciesData = async (req: Request, res: Response) => {
  try {
    const regions = await fetchRegions();
    console.log("Regions: ", regions);

    const randomRegion = getRandomRegion(regions);
    console.log("Selected Random Regions: ", randomRegion);
    
    const speciesList = await fetchSpeciesByRegion(randomRegion.identifier);
    console.log("Total Species in Region: ", speciesList.length);
    
    const criticallyEndangeredSpecies = await filterCriticallyEndangered(speciesList);
    console.log("Total Critically Endagered Species: ", criticallyEndangeredSpecies.length);
    
    const mammals = filterMammals(speciesList);
    console.log("Total Mammals in the Region: ", mammals.length);

    for (const species of criticallyEndangeredSpecies.slice(0, 10)) {
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