export interface Specie {
  id: number;
  kingdom: string;
  phylum: string;
  class: string;
  "order": string;
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
