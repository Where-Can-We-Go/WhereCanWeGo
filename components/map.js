import useNonprofitStore from "../lib/nonprofits";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const icon = L.icon({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  popupAnchor: [12, 0],
});

function CenterOnZipCoords(props) {
  const map = useMap();
  map.setView(props.zipCoords, map.getZoom());

  return null;
}

export default function Map({ children }) {
  const nonprofits = useNonprofitStore((state) => state.nonprofits);
  const zipCoords = useNonprofitStore((state) => state.zipCoords);

  return (
    <MapContainer
      center={zipCoords}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CenterOnZipCoords zipCoords={zipCoords}></CenterOnZipCoords>
      {nonprofits.map((npInfo, i) => {
        return (
          <Marker
            key={npInfo.NAME}
            position={[npInfo.lat, npInfo.lon]}
            icon={icon}
            draggable={false}
          >
            <Popup>{npInfo.NAME}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
