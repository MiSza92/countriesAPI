export type country = {
  name: {
    common: string;
    official: string;
    cca3: string;
    nativeName?: {
      key: string;
      official: string;
      common: string;
    }[];
  };

  independent: boolean;
  currencies?: {
    key: string;
    name: string;
    symbol: string;
  }[];
  flag: string;
  capital: { name: string; latlng?: number[] }[];

  altSpellings: string[];
  region: string;
  subregion?: string;
  languages?: {
    key: string;
    value: string;
  }[];
  area: number;

  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  coatOfArms?: {
    png: string;
    svg: string;
  };
  startOfWeek: string;
};
export type CountryState = {
  allCountries: country[];
  reducedCountries: country[];
  selectedCountry: country | null;
  continents: string[];
  selectedContinent: string | null;
  loading: boolean;
  sortConfig?: {
    key: reducerKey;
    direction: "asc" | "desc";
  } | null;
};

export type reducerKey =  "name" | "population";

export type CountryAction = {
  type: string;
  payload: string | country|null;
};
