import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

type Props = {
  address: string;
};

const MapUpdater = ({ position }: { position: { lat: number; lng: number } | null }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);
  return null;
};

const MapComponent = ({ address }: Props) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        if (response.data.length > 0) {
          const location = response.data[0];
          setPosition({ lat: parseFloat(location.lat), lng: parseFloat(location.lon) });
        } else {
          console.error("location not found");
        }
      } catch (error) {
        console.error('Error fetching location', error);
      }
    };
    fetchLocation();
  }, [address]);

  return (
    <div>
      <MapContainer style={{ height: "200px", width: "100%",zIndex:"10" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {position && <Marker position={position} />}
        <MapUpdater position={position} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;