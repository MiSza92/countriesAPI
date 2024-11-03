import React from "react";
import DropDown from "./DropDown/dropDown";

import "./toolBarStyle.css";
import { useCountry } from "../../utils/countryContext";
import { reducerKey } from "../../utils/customType";

const ToolBar: React.FC = () => {
  const { state, dispatch } = useCountry();


  const handleContinentChange = (value: string) => {
   
    dispatch({ type: "FILTER_BY_KEY", payload: value });
  };

  const handleSortChange = (value: string) => {
  
    const [key, direction] = value.split("-") as [reducerKey, "asc" | "desc"];
    dispatch({
      type: "SORT_COUNTRIES",
      payload: { key, direction },
    });
  };

  const continentOptions = state.continents
    ? state.continents.sort().map((continent) => ({
        value: continent,
        label: continent,
      }))
    : [];

  const sortOptions = [
   
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "population-asc", label: "Population (Low to High)" },
    { value: "population-desc", label: "Population (High to Low)" },
  ];


  return (
    <div className="toolBar">
      {!state.loading ? (
        <>
          <div className="toolBox logo">
            <img src="erde.svg" alt="logo" />
            Countries API
          </div>

          <div className="toolBox totalCountries">
            <p>Total Countries: {state.reducedCountries.length}</p>
          </div>

          <div className="toolBox dropDowns">
            <div className="filterCon">
              <DropDown
                title="All continents"
                options={continentOptions}
                onChange={handleContinentChange}
              />
            </div>

            <div className="sortCon">
              <DropDown
                title="No sorting"
                options={sortOptions}
                onChange={handleSortChange}
              />
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ToolBar;
