import { Specie } from "../models/specie";

export const fetchRegions = async () => {
    return [
      { name: "Region 1" },
      { name: "Region 2" },
      { name: "Region 3" }
    ];
  };
  
  export const fetchSpeciesByRegion = async (region: string): Promise<Specie[]> => {
    return [
      { id: "1", name: "Species 1", region, status: "CRITICALLY ENDANGERED", class: "MAMMALIA" },
      { id: "2", name: "Species 2", region, status: "ENDANGERED", class: "REPTILIA" },
      { id: "3", name: "Species 3", region, status: "CRITICALLY ENDANGERED", class: "MAMMALIA" }
    ];
  };
  
  export const fetchConservationMeasures = async (speciesId: string) => {
    return [
      { title: "Measure 1 for " + speciesId },
      { title: "Measure 2 for " + speciesId }
    ];
  };