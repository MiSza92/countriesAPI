import { useEffect, useState, useCallback } from "react";
import { country } from "../utils/customType";

export function useGetApi(): {
  countries: country[];
  continents: string[];
  loading: boolean;
  error: string | null;
} {
  const [countries, setCountries] = useState<country[]>([]);
  const [continents, setContinents] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const url = `https://restcountries.com/v3.1/all`;

    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`[UseGetAPI] HTTP error status: ${response.status}`);
      }
      const body: country[] = await response.json();
      const countries = parseCountries(body);
      console.log(countries);

      if (countries instanceof Error) {
        return countries.message;
      } else {
        setCountries(countries);
        setContinents(filterContinents(countries));
      }
    } catch (error) {
      setError(`[useGetAPI] ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { countries, continents, loading, error };
}

function parseCountries(apiData: country[]) {
  const parsedCountries: country[] = [];

  for (const apiCountry of apiData) {
    const parsedCountry: country = {
      name: {
        common: apiCountry.name.common,
        official: apiCountry.name.official || "N/A",
        cca3: apiCountry.name.cca3,
        nativeName: apiCountry.name.nativeName
          ? Object.entries(apiCountry.name.nativeName).map(([key, value]) => ({
              key,
              official: value.official || "N/A",
              common: value.common || "N/A",
            }))
          : undefined,
      },
      independent: apiCountry.independent,
      currencies: apiCountry.currencies
        ? Object.entries(apiCountry.currencies).map(([key, value]) => ({
            key,
            name: value.name || "N/A",
            symbol: value.symbol || "N/A",
          }))
        : undefined,
      flag: apiCountry.flag,
      capital: apiCountry.capital
        ? apiCountry.capital.map((name) => ({
            name,
            latlng: apiCountry.capitalInfo?.latlng,
          }))
        : [{ name: "N/A", latlng: undefined }],

      altSpellings: apiCountry.altSpellings || [],
      region: apiCountry.region,
      subregion: apiCountry.subregion || "N/A",
      languages: apiCountry.languages
      ? Object.entries(apiCountry.languages).map(([key, value]) => ({
      
        key: value.key ,
        value: value,
      }))
    :[{ key: "N/A", value: "N/A" }],
      area: apiCountry.area || 0,

      maps: apiCountry.maps,
      population: apiCountry.population || 0,
      timezones: apiCountry.timezones || [],
      continents: apiCountry.continents || [],
      flags: {
        png: apiCountry.flags?.png || "N/A",
        svg: apiCountry.flags?.svg || "N/A",
        alt: apiCountry.flags?.alt || "N/A",
      },
      coatOfArms: apiCountry.coatOfArms,
      startOfWeek: apiCountry.startOfWeek || "N/A",
    };

    parsedCountries.push(parsedCountry);
  }

  return parsedCountries;
}
function filterContinents(countries: country[]): string[] {
  try {
    const continentsArr: string[] = [];
    for (const country of countries) {
      for (const continent of country.continents) {
        if (!continentsArr.includes(continent)) {
          continentsArr.push(continent);
        }
      }
    }
    
    return continentsArr;
  } catch (error) {
    alert(error);
    return error as string[];
  }
}
