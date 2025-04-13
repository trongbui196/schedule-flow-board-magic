import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const locations = [
  {
    id: 1,
    name: "Bitexco Financial Tower",
    address: "2 Hai Trieu, District 1",
    category: "Landmark",
    coordinate: [10.7717, 106.7042]
  },
  // ... rest of the locations array ...
];

const Map = () => {
  const apikey = 'ef53974d6ee876523a7a2ac4c6b7c55d0ec2001fa5d98249';
  const center: LatLngExpression = [10.762622, 106.660172];

  return (
    <div className="h-full w-full">
      <MapContainer 
        center={center} 
        zoom={15} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url={`https://maps.vietmap.vn/api/lm/{z}/{x}/{y}@2x.png?apikey=${apikey}`}
          attribution="&copy; VIETMAP"
        />
        {locations.map(location => (
          <Marker
            key={location.id}
            position={location.coordinate as LatLngExpression}
            icon={icon}
          >
            <Popup>
              <div>
                <h3>{location.name}</h3>
                <p>{location.address}</p>
                <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                  {location.category}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map; 