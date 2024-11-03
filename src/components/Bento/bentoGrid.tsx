import React from "react";
import Bento from "./bento";

import "./bentoGridStyle.css";
import { useCountry } from "../../utils/countryContext";
import { country } from "../../utils/customType";

const BentoGrid: React.FC = () => {
  const { state, dispatch } = useCountry();

  const toggleModal = (country: country) => {
    dispatch({ type: "SET_SELECTED_COUNTRY", payload: country });
  };

  return (
    <div className="bento-grid">
      <div className="bento-item image-container">
        <img
          src={`src/assets/${state.reducedCountries[0].continents}.png`}
          alt={`Image of ${state.reducedCountries[0].continents}`}
        />
      </div>

      {state.reducedCountries.map((country) => (
        <Bento
          key={country.name?.common}
          selectedCountry={country}
          onClick={toggleModal}
        />
      ))}
    </div>
  );
};

export default BentoGrid;
