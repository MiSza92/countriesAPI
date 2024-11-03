import React, { forwardRef, useRef, useEffect } from "react";
import "./ModalStyle.css";
import CountryMap from "../CountryMap/countryMap";
import { useCountry } from "../../utils/countryContext";

const Modal = forwardRef<HTMLDialogElement>((props, ref) => {
  const { state, dispatch } = useCountry();
  const { selectedCountry } = state;
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalBoxRef = useRef<HTMLDivElement>(null);

  const handleModalClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const target = event.target as HTMLElement;
    if (
      target === modalRef.current ||
      target.classList.contains("closeButton")
    ) {
      if (modalRef.current) {
        modalRef.current.close();
        
      }
      dispatch({
        type: "SET_SELECTED_COUNTRY",
        payload: null,
      });
    }
  };

  useEffect(() => {
    if (selectedCountry && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [selectedCountry]);

  if (!selectedCountry) return null;

  return (
    <dialog ref={modalRef} className="modalBG" onClick={handleModalClick}>
      {selectedCountry && (
        <div ref={modalBoxRef} className="modalBox">
          <div className="headerSection">
            <h1>{selectedCountry.name.official}</h1>
            <h3>( {selectedCountry.name.common} )</h3>

            <button className="closeButton">X</button>
          </div>

          <div className="body">
            <div className="sideBox">
              <div className="textBox">
                <table>
                  <tbody>
                    <tr>
                      <td>Original Name:</td>
                      <td>
                    
                        {selectedCountry.name.nativeName &&
                          (selectedCountry.name.nativeName.length > 2
                            ? `${selectedCountry.name.nativeName[0].common}, ${selectedCountry.name.nativeName[1].common} (...+${selectedCountry.name.nativeName.length - 2})`
                            : selectedCountry.name.nativeName
                                .map((lang) => lang.common)
                                .join(", "))}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {selectedCountry.languages &&
                        selectedCountry.languages.length > 1
                          ? "Languages:"
                          : "Language:"}
                      </td>
                      <td>
                        {selectedCountry.languages &&
                          (selectedCountry.languages.length > 2
                            ? `${selectedCountry.languages[0].value}, ${selectedCountry.languages[1].value} (...+${selectedCountry.languages.length - 2})`
                            : selectedCountry.languages
                                .map((lang) => lang.value)
                                .join(", "))}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {selectedCountry.currencies &&
                        selectedCountry.currencies.length > 1
                          ? "Currencies:"
                          : "Currency:"}
                      </td>
                      <td>
                        {selectedCountry.currencies &&
                          (selectedCountry.currencies.length > 2
                            ? `${selectedCountry.currencies[0].symbol} - ${selectedCountry.currencies[0].name} (${selectedCountry.currencies[0].key}), ${selectedCountry.currencies[1].symbol} - ${selectedCountry.currencies[1].name} (${selectedCountry.currencies[1].key})(...+${selectedCountry.currencies.length - 2})`
                            : selectedCountry.currencies
                                .map(
                                  (currency) =>
                                    `${currency.symbol} - ${currency.name} (${currency.key})`
                                )
                                .join(", "))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flagBox">
                <img
                  src={selectedCountry.flags.png}
                  alt={selectedCountry.flags.alt}
                />
              </div>
              <div className="textBox">
                
                <table>
                  <tbody>
                    <tr>
                      <td>Continent:</td>
                      <td>
                        {selectedCountry.continents &&
                          (selectedCountry.continents.length > 2
                            ? `${selectedCountry.continents[0]}, ${selectedCountry.continents[1]} (...+${selectedCountry.continents.length - 2})`
                            : selectedCountry.continents
                                .map((lang) => lang)
                                .join(", "))}
                      </td>
                    </tr>
                    <tr>
                      <td>Region:</td>
                      <td>{selectedCountry.region}</td>
                    </tr>
                    <tr>
                      <td>Subregion:</td>
                      <td>{selectedCountry.subregion}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mapBox">
              <CountryMap country={selectedCountry} />
            </div>
            <div className="sideBox">
              <div className="flagBox">
                <img
                  src={selectedCountry.coatOfArms?.png}
                  alt="Sorry there is no"
                />
              </div>
              <div className="textBox">
            
                <table>
                  <tbody>
                    <tr>
                      <td>
                      
                        {selectedCountry.capital &&
                        selectedCountry.capital.length > 1
                          ? "Capitals:"
                          : "Capital:"}
                      </td>
                      <td>
                        {selectedCountry.capital &&
                          (selectedCountry.capital.length > 2
                            ? `${selectedCountry.capital[0].name}, ${selectedCountry.capital[1].name} (...+${selectedCountry.capital.length - 2})`
                            : selectedCountry.capital
                                .map((lang) => lang.name)
                                .join(", "))}
                      </td>
                    </tr>
                    <tr>
                      <td>Independent:</td>
                      <td>{selectedCountry.independent ? "True" : "False"}</td>
                    </tr>
                    <tr>
                      <td>Population:</td>
                      <td>{selectedCountry.population}</td>
                    </tr>
                    <tr>
                      <td>Area:</td>
                      <td>{selectedCountry.area}</td>
                    </tr>
                    <tr>
                      <td>Start of Week:</td>
                      <td>
                        {selectedCountry.startOfWeek[0].toLocaleUpperCase() +
                          selectedCountry.startOfWeek.slice(1)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
});

export default Modal;
