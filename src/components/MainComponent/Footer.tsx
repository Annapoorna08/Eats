import React from 'react';
import { IonFooter, IonToolbar, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';

import './Footer.css';

const Footer: React.FC = () => {
  return (
    <IonFooter>
      <IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol>
              <h4>Get to Know Us</h4>
              <ul>
                <li>About Us</li>
               
              </ul>
            </IonCol>
           
            
           
          </IonRow>

          <IonRow>
            <IonCol>
              <h4>Available on the</h4>
              <a href='https://play.google.com/store/'> 
              <img src="/assets/icons/google-play.png" alt="Google Play" /> </a>
              <a href='https://www.apple.com/in/app-store/'> 
              <img src="/assets/icons/app-store.png" alt="App Store" /></a>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <p>Terms of Service | Privacy Policy | Delivery Locations | Do Not Sell or Share My Personal Information</p>
              <p>© 2024 eats</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
