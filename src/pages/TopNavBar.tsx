import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/react';

const TopNavBar: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>Domino's Pizza</IonTitle>
        <IonButtons slot="end">
          <IonButton>Login</IonButton>
          <IonButton>Sign Up</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default TopNavBar;
