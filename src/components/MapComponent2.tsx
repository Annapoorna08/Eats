// src/components/MapComponent.tsx
import React, { useEffect, useState } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';


const mapContainerStyle: React.CSSProperties = {
  height: '50vh',
  width: '50%',
};

interface LatLng {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  origin: LatLng;
  destination: LatLng;
}

const MapComponent2: React.FC<MapComponentProps> = ({ origin, destination }) => {
  
 

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    const fetchDirections = async () => {
      if (origin && destination && window.google) {
        const directionsService = new window.google.maps.DirectionsService();
        try {
          const result = await directionsService.route({
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          });
          setDirections(result);
        } catch (error) {
          console.error('Error fetching directions:', error);
        }
      }
    };
    fetchDirections();
  }, [origin, destination]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={7}
      center={origin}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default MapComponent2;