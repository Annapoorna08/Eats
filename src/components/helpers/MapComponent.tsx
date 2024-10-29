import React, { useEffect, useRef } from 'react';
import { LoadScript } from '@react-google-maps/api';


const containerStyle = {
  width: '50%',
  height: '500px',
};

interface MapComponentProps {
  driverLocation: { lat: number; lng: number };
  customerLocation: { lat: number; lng: number };
}

const MapComponent: React.FC<MapComponentProps> = ({ driverLocation, customerLocation }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
 

  // Use your Map ID from Google Cloud Console
  const mapId = 'e7c93711b9d2b2e2'; // Replace with your actual Map ID

  // Bike icon for the driver marker (you can replace this with a Swiggy-like bike icon)
  const driverIcon = {
    url: '/assets/icons/bike.png', // Use a custom bike icon URL
    scaledSize: new window.google.maps.Size(50, 50), // Size of the icon
  };

 
  useEffect(() => {
    if (mapRef.current && window.google && window.google.maps) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: driverLocation,
        zoom: 18,
        mapId: mapId, // Add Map ID to enable Advanced Markers
      });

      if (window.google.maps.marker) {
        // Create actual DOM elements for the customer content
        const customerContent = document.createElement('div');
        customerContent.style.color = 'green';
        customerContent.style.fontWeight = 'bold';
        customerContent.textContent = 'Customer';

        // Use AdvancedMarkerElement for customer marker
        const customerMarker = new window.google.maps.marker.AdvancedMarkerElement({
          position: customerLocation,
          map: map,
          content: customerContent,
        });

        // Use traditional Marker for driver with custom bike icon
        const driverMarker = new window.google.maps.Marker({
          position: driverLocation,
          map: map,
          icon: driverIcon, // Custom bike icon for the driver
        });

        // Create a polyline between driver and customer
        const polyline = new window.google.maps.Polyline({
          path: [driverLocation, customerLocation],
          geodesic: true,
          strokeColor: '#FF4500', // Use Swiggy-like color (Orange)
          strokeOpacity: 0.8,
          strokeWeight: 6, // Thicker line for visibility
        });

        polyline.setMap(map);

        return () => {
          // Cleanup markers and polyline
          driverMarker.setMap(null);
          customerMarker.map = undefined;
          polyline.setMap(null);
        };
      } else {
        console.error("AdvancedMarkerElement is not available. Ensure you're using API version 3.56 or above.");
      }
    }
  }, [driverLocation, customerLocation]);

  return (
  
      <div style={containerStyle} ref={mapRef} />
    
    
  );
};

export default MapComponent;
