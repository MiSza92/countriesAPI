import { ReactElement } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { country } from "../../utils/customType";
import "../Modal/ModalStyle.css";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

interface MapProps {
  country: country;
}

function CountryMap({ country }: MapProps): ReactElement {
  const capitalPos = country.capital[0]?.latlng;

  const position: LatLngExpression = capitalPos ? [capitalPos[0], capitalPos[1]] : [51.1657, 10.4515];

  return (
    <MapContainer
      center={position}
      zoom={5}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={position}>
        <Popup>{country.capital[0]?.name} - Hauptstadt</Popup>
      </Marker>
    </MapContainer>
  );
}

export default CountryMap;
