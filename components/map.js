import useNonprofitStore from "../lib/nonprofits";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const icon = L.icon({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  popupAnchor: [12, 0],
});

export default function Map({ children }) {
  const nonprofits = useNonprofitStore((state) => state.nonprofits);
  return (
    <MapContainer
      center={[29.6436, -82.3549]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {nonprofits.map((npInfo, i) => {
        return (
          <Marker
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
