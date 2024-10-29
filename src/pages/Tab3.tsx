import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';


import MapComponent from '../components/MapComponent2';


const Tab3: React.FC = () => {

  const origin = { lat: 11.898686380629103, lng: 75.35212333091154 }; // Example origin (San Francisco)
  const destination = { lat: 11.9059639, lng: 75.3353795 }; // Example destination (Los Angeles)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      
      <MapComponent origin={origin} destination={destination} />

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
