import { CountryState, CountryAction, country, reducerKey } from "./customType";

export const countryReducer = (
  state: CountryState,
  action: CountryAction
): CountryState => {
  switch (action.type) {
    case "FILTER_BY_KEY": {
      const filtered =
        action.payload === null
          ? state.allCountries
          : state.allCountries.filter((country) =>
              country.continents.includes(action.payload)
            );

      const sortedAndFiltered = state.sortConfig
        ? sortCountries(
            filtered,
            state.sortConfig
          )
        : filtered;

      return {
        ...state,
        selectedContinent: action.payload,
        reducedCountries: sortedAndFiltered,
      };
    }

    case "SORT_COUNTRIES": {
      const newCountriesList = sortCountries(
        state.reducedCountries,
        action.payload
      );

      return {
        ...state,
        sortConfig: action.payload,
        reducedCountries: newCountriesList,
      };
    }

    case "SET_SELECTED_COUNTRY":
      return {
        ...state,
        selectedCountry: action.payload as country|null,
      };

    default:
      return state;
  }
};
const sortCountries = (

  countries: country[],
  sortConfig: { key: reducerKey; direction: "asc" | "desc" }
) => {
  if (sortConfig.key === null) return countries;

  return [...countries].sort((a, b) => {
    let comparison = 0;

    switch (sortConfig.key) {
      case "name":
        const valueA = a.name.common.toLowerCase();
        const valueB = b.name.common.toLowerCase();
        comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        break;

      case "population":
        comparison =
          a.population < b.population
            ? -1
            : a.population > b.population
              ? 1
              : 0;
        break;
    }

    return sortConfig.direction === "asc" ? comparison : -comparison;
  });
};
