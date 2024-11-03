import React from "react";
import "./bentoGridStyle.css";
import { country } from "../../utils/customType";

interface BentoProps {
  selectedCountry: country;
  onClick: (country: country) => void;
}

const Bento: React.FC<BentoProps> = ({ selectedCountry, onClick }) => {
  return (
    <div
      className="bento-item country-card"
      onClick={() => onClick(selectedCountry)}
    >
      <h2>{selectedCountry.name?.common}</h2>
      <p>
        Capitol:{" "}
        {selectedCountry.capital &&
          selectedCountry.capital.map((capital) => capital.name).join(", ")}
      </p>

      <p>
        Language:{" "}
        {selectedCountry.languages &&
          (selectedCountry.languages.length > 2
            ? `${selectedCountry.languages[0].value}, ${selectedCountry.languages[1].value} (...+${selectedCountry.languages.length - 2})`
            : selectedCountry.languages.map((lang) => lang.value).join(", "))}
      </p>

      <p>Population: {selectedCountry.population}</p>
    </div>
  );
};

export default Bento;
