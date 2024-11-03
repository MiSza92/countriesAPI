import { createContext, ReactNode, useContext, useReducer } from "react";
import { country, CountryAction, CountryState } from "./customType";
import { countryReducer } from "./countryReducer";

const CountryContext = createContext<
   {
      state: CountryState;
      dispatch: React.Dispatch<CountryAction>;
    }
  | undefined
>(undefined);

export const CountryProvider: React.FC<{
  children: ReactNode;
  initialCountries: country[];
  initialContinents: string[];
}> = ({ children, initialCountries, initialContinents }) => {
  const [state, dispatch] = useReducer(countryReducer, {
    allCountries: initialCountries,
    reducedCountries: initialCountries,
    selectedCountry: null,
    continents: initialContinents,
    selectedContinent: null,
    loading: false,
    sortConfig: null,
  });

  return (
    <CountryContext.Provider value={{ state, dispatch }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error("context nicht populated");
  }
  return context;
};
