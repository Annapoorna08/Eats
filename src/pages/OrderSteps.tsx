import React from 'react';
import { IonContent, IonItem, IonLabel, IonCheckbox } from '@ionic/react';

const OrderSteps: React.FC = () => {
  return (
    <IonContent>
      <IonItem>
        <IonLabel>1. Delivery Address</IonLabel>
        <IonCheckbox slot="start" />
      </IonItem>
      <IonItem>
        <IonLabel>2. Payment</IonLabel>
        <IonCheckbox slot="start" />
      </IonItem>
      <IonItem>
        <IonLabel>3. Review</IonLabel>
        <IonCheckbox slot="start" />
      </IonItem>
    </IonContent>
  );
};

export default OrderSteps;
