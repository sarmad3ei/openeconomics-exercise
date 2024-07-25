const API_TOKEN = '9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee';

interface Region {
  name: string;
  identifier: string;
}

interface Species {
  id: number;
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  scientificName: string;
  taxonomicAuthority: string;
  infraRank?: string | null;
  infraName?: string | null;
  population?: string | null;
  category: string;
  mainCommonName?: string | null;
  region: string;
  conservationMeasures?: string;
}

const fetchRegions = async (): Promise<Region[]> => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`https://apiv3.iucnredlist.org/api/v3/region/list?token=${API_TOKEN}`);
    const data: any = await response.json();
    return data.results.map((region: any) => ({
      name: region.name,
      identifier: region.identifier,
    }));
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
};

const getRandomRegion = (regions: Region[]): Region => {
  const randomIndex = Math.floor(Math.random() * regions.length);
  return regions[randomIndex];
};

const fetchSpeciesByRegion = async (region: string): Promise<Species[]> => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`https://apiv3.iucnredlist.org/api/v3/species/region/${region}/page/0?token=${API_TOKEN}`);
    const data: any = await response.json();
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

const test = async () => {
  try {
    const regions = await fetchRegions();
    console.log('First 3 Regions:', regions.slice(0, 3));

    const randomRegion = getRandomRegion(regions);
    console.log('Random Region:', randomRegion);

    const speciesList = await fetchSpeciesByRegion(randomRegion.identifier);
    console.log('First 3 Species List:', speciesList.slice(0, 3));
  } catch (error) {
    console.error('Error during test:', error);
  }
};

test();
