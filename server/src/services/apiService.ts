import { Region, Specie } from "../models";
import { getRandomElement } from "../utilities/utils";

const API_TOKEN = '9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee';

export const fetchRegions = async (): Promise<Region[]> => {
  try {
    const response = await fetch(`https://apiv3.iucnredlist.org/api/v3/region/list?token=${API_TOKEN}`);
    const data = await response.json();
    return data.results.map((region: any) => ({
      name: region.name,
      identifier: region.identifier,
    }));
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
};

export const getRandomRegion = (regions: Region[]): Region => {
  return getRandomElement(regions);
};

export const fetchSpeciesByRegion = async (region: string): Promise<Specie[]> => {
  try {
    const response = await fetch(`https://apiv3.iucnredlist.org/api/v3/species/region/${region}/page/0?token=${API_TOKEN}`);
    const data = await response.json();
    return data.result.map((item: any) => ({
      id: item.taxonid,
      kingdom: item.kingdom_name,
      phylum: item.phylum_name,
      class: item.class_name,
      order: item.order_name,
      family: item.family_name,
      genus: item.genus_name,
      scientificName: item.scientific_name,
      taxonomicAuthority: item.taxonomic_authority,
      infraRank: item.infra_rank,
      infraName: item.infra_name,
      population: item.population,
      category: item.category,
      mainCommonName: item.main_common_name,
      region: region,
    }));
  } catch (error) {
    console.error(`Error fetching species for region ${region}:`, error);
    throw error;
  }
};
  
export const fetchConservationMeasures = async (speciesId: number): Promise<string> => {
  try {
    const response = await fetch(`https://apiv3.iucnredlist.org/api/v3/measures/species/id/${speciesId}?token=${API_TOKEN}`);
    const data = await response.json();
    const measures = data.result.map((measure: { title: string }) => measure.title).join(', ');
    return measures;
  } catch (error) {
    console.error(`Error fetching conservation measures for species ID ${speciesId}:`, error);
    throw error;
  }
};

export const filterCriticallyEndangered = async (speciesList: Specie[]): Promise<Specie[]> => {
  const criticallyEndangeredSpecies = speciesList.filter(species => species.category === 'CR');

  for (const species of criticallyEndangeredSpecies) {
    species.conservationMeasures = await fetchConservationMeasures(species.id);
  }

  return criticallyEndangeredSpecies;
};