// App.tsx
import React from 'react';
import {
  IonApp,
  IonHeader,
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import './Register.css';

const Register: React.FC = () => {
  return (
    <IonApp>
      <IonPage>
        <IonContent fullscreen>
          {/* Background and Main Header */}
          <div className="header-container">
            <div className="overlay"></div>
            <div className="header-text">
              <IonText color="light">
                <h1>Partner with Swiggy!</h1>
                <p>Reach customers far away from you</p>
              </IonText>
            </div>
          </div>

          {/* Get Started Form */}
          <IonCard className="get-started-card">
            <IonCardContent>
              <h2>Get Started</h2>
              <IonInput
                placeholder="Enter Restaurant ID / Mobile number"
                type="text"
                className="input-box"
              />
              <IonButton expand="block" color="primary" className="continue-button">
                Continue
              </IonButton>
              <p className="terms-text">
                By logging in, I agree to Swiggy’s{' '}
                <a href="#terms">terms & conditions</a>
              </p>
            </IonCardContent>
          </IonCard>

          {/* Steps Section */}
          <section className="steps-section">
            <IonText className="steps-heading">
              <h3>In just 3 easy steps</h3>
              <h4>Get your restaurant delivery-ready in 24hrs!</h4>
            </IonText>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <div className="step">
                    <span>STEP 1</span>
                    <p>Install the Swiggy Owner App</p>
                  </div>
                </IonCol>
                <IonCol>
                  <div className="step">
                    <span>STEP 2</span>
                    <p>Login/Register using your phone number</p>
                  </div>
                </IonCol>
                <IonCol>
                  <div className="step">
                    <span>STEP 3</span>
                    <p>Enter restaurant details</p>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </section>

          {/* Document Section */}
          <IonCard className="document-card">
            <IonCardContent>
              <IonText>
                <h4>For an easy form filling process, you can keep these documents handy.</h4>
              </IonText>
              <ul className="document-list">
                <li>
                  FSSAI License copy <a href="#apply">Apply Here</a>
                </li>
                <li>Your Restaurant menu</li>
                <li>Bank details</li>
                <li>GSTIN <a href="#apply">Apply Here</a></li>
                <li>PAN card copy</li>
              </ul>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Register;
