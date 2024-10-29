import React from 'react';
import './MobileCard.css'
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

const MobileCard: React.FC = () => {
  return (
    <IonCard className="my-card">
      <IonCardHeader>
        <IonCardTitle>Card Title</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        This is a small card component.
      </IonCardContent>
    </IonCard>
  );
};

export default MobileCard;