import React from 'react';
import { IonContent, IonList, IonItem, IonLabel } from '@ionic/react';

const OrderSummary: React.FC = () => {
  return (
    <IonContent>
      <IonList>
        <IonItem>
          <IonLabel>Item 1: ₹2403</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Delivery Charges: Free</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>GST and Restaurant Charges: ₹41.28</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Total: ₹451</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  );
};

export default OrderSummary;
