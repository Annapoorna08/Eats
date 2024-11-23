import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonText, IonCard, IonCardHeader, IonCardContent, IonGrid, IonRow, IonCol ,IonList,IonCheckbox} from '@ionic/react';
import Header from '../../components/MainComponent/Header'

import './AddToCartPage.css'

const AddToCartPage: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const itemTotal = 329; // Item price
  const deliveryPartnerFee = 34; // Delivery fee
  const extraDiscount = 25; // Discount
  const platformFee = 6; // Platform fee
  const gstCharges = 49.03; // GST charges

  // Calculate total
  const total = itemTotal + deliveryPartnerFee - extraDiscount + platformFee + gstCharges;

  return (
    <IonPage>
     

      <Header />
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <h2>Account</h2>
                  <p>To place your order now, log in to your existing account or sign up.</p>
                </IonCardHeader>
                <IonCardContent>
                  <IonButton expand="full">Log In</IonButton>
                  <IonButton expand="full" color="success">Sign Up</IonButton>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <h2>Delivery Address</h2>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonLabel>Your Address Here</IonLabel>
                  </IonItem>
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <h2>Payment</h2>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                   
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>



            <IonCol size="12" size-md="4">
              <IonCard>
                <IonCardHeader>
                  <h2>Cart Summary</h2>
                  <IonItem>      
          <img src="https://via.placeholder.com/100" alt="Pizza" />
          <IonLabel>
            <h2>Pizza Hut</h2>
          </IonLabel>
        </IonItem>

        <IonList>
        <IonLabel>
        <p>Momo Mia! Pizza Non-Veg</p>
          </IonLabel>
          <IonText slot="end">₹{itemTotal - extraDiscount}</IonText>

        <IonItem>
            <IonButton onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</IonButton>
            &nbsp;&nbsp;{quantity} &nbsp;&nbsp;
            <IonButton onClick={() => setQuantity(quantity + 1)}>+</IonButton>
            <IonText slot="end">₹{itemTotal}</IonText>
          </IonItem>

          <IonItem>
            <IonCheckbox />
            <IonLabel>Opt in for No-contact Delivery</IonLabel>
          </IonItem>
        </IonList>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonLabel>Item Total</IonLabel>
                    <IonText slot="end">₹{itemTotal}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Delivery Fee</IonLabel>
                    <IonText slot="end">₹{deliveryPartnerFee}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Discount</IonLabel>
                    <IonText slot="end">-₹{extraDiscount}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Platform Fee</IonLabel>
                    <IonText slot="end">₹{platformFee}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonLabel>GST Charges</IonLabel>
                    <IonText slot="end">₹{gstCharges.toFixed(2)}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Total</IonLabel>
                    <IonText slot="end" color="primary" style={{ fontWeight: 'bold' }}>₹{total.toFixed(2)}</IonText>
                  </IonItem>
                  <IonButton expand="full" color="primary" size="large">Proceed to Payment</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>

          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AddToCartPage;
