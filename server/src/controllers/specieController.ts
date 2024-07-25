import { Request, Response } from 'express';
import { saveSpecies, getAllSpecies  } from '../services/dbService';
import { Specie } from '../models/specie';
import { fetchConservationMeasures, fetchRegions, fetchSpeciesByRegion } from '../services/apiService';
import { getRandomElement } from '../utilities/utils';

const filterCriticallyEndangered = async (speciesList: Specie[]): Promise<Specie[]> => {
  const criticallyEndangeredSpecies = await Promise.all(speciesList
    .filter(species => species.status === 'CRITICALLY ENDANGERED')
    .map(async species => {
      const measures: { title: string }[] = await fetchConservationMeasures(species.id);
      const conservationMeasures = measures.map(m => m.title).join(', ');
      const speciesData: Specie = { ...species, conservationMeasures };
      saveSpecies(speciesData);
      return speciesData;
    })
  );
  return criticallyEndangeredSpecies;
};

const filterMammals = (speciesList: Specie[]): Specie[] => {
  return speciesList.filter(species => species.class === 'MAMMALIA');
};

export const getSavedSpecies = async (req: Request, res: Response) => {
  try {
    const speciesList = await getAllSpecies();
    res.json(speciesList);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSpeciesData = async (req: Request, res: Response) => {
  try {
    const regions = await fetchRegions();
    const randomRegion = getRandomElement(regions);
    const speciesList = await fetchSpeciesByRegion(randomRegion.name);

    const criticallyEndangeredSpecies = await filterCriticallyEndangered(speciesList);
    const mammals = filterMammals(speciesList);

    res.json({
      criticallyEndangered: criticallyEndangeredSpecies,
      mammals
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
