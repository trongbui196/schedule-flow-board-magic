
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
  {
    id: 2,
    name: "Ben Thanh Market",
    address: "Le Loi, District 1",
    category: "Market",
    coordinate: [10.7726, 106.6980]
  },
  {
    id: 3,
    name: "Notre-Dame Cathedral",
    address: "1 Cong Xa Paris, District 1",
    category: "Landmark",
    coordinate: [10.7798, 106.6991]
  },
  {
    id: 4,
    name: "War Remnants Museum",
    address: "28 Vo Van Tan, District 3",
    category: "Museum",
    coordinate: [10.7793, 106.6922]
  },
  {
    id: 5,
    name: "Jade Emperor Pagoda",
    address: "73 Mai Thi Luu, District 1",
    category: "Temple",
    coordinate: [10.7872, 106.6991]
  },
  {
    id: 6,
    name: "Saigon Opera House",
    address: "7 Lam Son Square, District 1",
    category: "Landmark",
    coordinate: [10.7769, 106.7031]
  },
  {
    id: 7,
    name: "Independence Palace",
    address: "135 Nam Ky Khoi Nghia, District 1",
    category: "Landmark",
    coordinate: [10.7770, 106.6953]
  },
  {
    id: 8,
    name: "Tao Dan Park",
    address: "55C Nguyen Thi Minh Khai, District 1",
    category: "Park",
    coordinate: [10.7842, 106.6922]
  },
  {
    id: 9,
    name: "Saigon Central Post Office",
    address: "2 Cong Xa Paris, District 1",
    category: "Landmark",
    coordinate: [10.7799, 106.6996]
  },
  {
    id: 10,
    name: "Nguyen Hue Walking Street",
    address: "Nguyen Hue, District 1",
    category: "Street",
    coordinate: [10.7756, 106.7019]
  }
];

const VietMapLeaflet = () => {
  const apikey = 'ef53974d6ee876523a7a2ac4c6b7c55d0ec2001fa5d98249'; // Replace with your VietMap API Key
  const center: LatLngExpression = [10.762622, 106.660172]; // Ho Chi Minh City

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-md">
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
                <h3 className="font-bold">{location.name}</h3>
                <p className="text-sm">{location.address}</p>
                <span className="inline-block px-2 py-1 mt-1 bg-gray-100 text-gray-800 text-xs rounded">
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

export default VietMapLeaflet;
