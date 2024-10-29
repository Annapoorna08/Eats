import { useState, useEffect } from 'react';
import MapComponent from '../components/helpers/MapComponent'
import { Geolocation } from '@ionic-native/geolocation';

const CustomerPage: React.FC = () => {
  const [driverLocation, setDriverLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [customerLocation, setCustomerLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const driverId = "driver-123"; // Match the driver’s ID

  const hardcodedDriverLocation = {
    lat: 11.898686380629103, // Replace with your desired latitude
    lng: 75.35212333091154, // Replace with your desired longitude
  };


  const hardcodedcustomerLocation = {
    lat: 11.9059639 ,// Replace with your desired latitude
    lng: 75.3353795, // Replace with your desired longitude
  };

  useEffect(() => {
    
   // const locationRef = firebase.database().ref(`drivers/${driverId}/location`);
    //locationRef.on('value', (snapshot) => {
      //const location = snapshot.val();

      const interval = setInterval(() => {
        // Fetch updated driver location from the backend or API
        // Example: updateDriverLocation(newLocation);
        setDriverLocation(hardcodedDriverLocation);
      }, 5000); // Fetch every 5 seconds

      setCustomerLocation(hardcodedcustomerLocation);
      setDriverLocation(hardcodedDriverLocation);
    //});

    return () => {
      //locationRef.off(); // Clean up the listener
    };
  }, [driverId]);

  return (
    <div>
      <h2>Your order is on the way!</h2>
      <MapComponent driverLocation={driverLocation} customerLocation={customerLocation} />
    </div>
  );
};

export default CustomerPage;
