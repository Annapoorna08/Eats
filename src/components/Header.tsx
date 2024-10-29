import React, { useEffect, useState } from 'react';
import {IonHeader,IonToolbar,IonButtons,IonButton,IonSelect,IonMenu,IonLabel,IonIcon,IonListHeader,IonTitle,IonItem,IonContent,IonModal,IonList,IonText,IonInput,IonSearchbar,IonSelectOption,} from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Header.css'; // Import the CSS file
import { closeOutline,personCircle, locationSharp, cart ,logoGoogle, logoFacebook, logoApple } from 'ionicons/icons';
import { getPlatform, isIOS, isAndroid, isWeb } from './helpers/platformCheck'; // Import the helper functions

import AutocompleteSearch from './helpers/AutocompleteSearch';
const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeButton, setActiveButton] = useState<'signIn' | 'signUp'>('signIn');
  const history = useHistory();
  const handleNavigation = (link: string) => {
    history.push(link); // Adjust the path according to your routing setup
  };


  useEffect(() => {
    const platform = getPlatform(); // Use the helper function to get the platform
    if (platform === 'ios') {
      console.log('Running on iOS');
    } else if (platform === 'android') {
      console.log('Running on Android');
    } else if (platform === 'web') {
      console.log('Running on the Web');
    }

    // Or use specific platform check helpers
    if (isIOS()) {
      console.log('Specific check: Running on iOS');
    }
    if (isAndroid()) {
      console.log('Specific check: Running on Android');
    }
    if (isWeb()) {
      console.log('Specific check: Running on Web');
    }
  }, []);

  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

 

  return (
    <>
    <IonHeader>
      <IonToolbar style={{ backgroundColor: 'white' }}>
        {/* Logo on the left */}
        <IonButtons slot="start">
        <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/tab1'); }}>
          <img
            src="/assets/icons/eat.png" // Replace with your logo path
            alt="Logo"
            style={{
              height: '60px', // Adjust height
              marginLeft: '30px', // Space from the left edge
              marginRight: '30px', // Space between logo and menu button
            }}
          />
          </a>
        </IonButtons>

        {/* Reduced length Search box */}
       
        <div className="search-and-select-container">
        {!isMobile && (
            <>
            <AutocompleteSearch />
            <br></br>
          <IonSearchbar
                placeholder="Search for food"
            className="responsive-searchbar" // Set a fixed width for the search bar
          />
              
        
          </>
          )}

          <div className="auth-buttons">
            <div className="desktop-buttons">
              <IonButton onClick={() => setShowModal(true)} >Sign In</IonButton>
              <IonButton onClick={() => setShowModal(true)} >Sign Up</IonButton>
               {/* Cart Button */}
               <IonButton fill="clear" slot="end" onClick={(e) => { e.preventDefault(); handleNavigation('/AddToCartPage'); }} >
            <IonIcon icon={cart} color="dark" />
          </IonButton>
            </div>
            <div className="mobile-button">
              <IonButton onClick={() => setShowModal(true)} >Login</IonButton>
            {isWeb() && (
              <IonButton>Open App</IonButton>
            )}
            </div>
          </div>
        </div>
      </IonToolbar>
      
      {isMobile && (
        <>
      <IonToolbar style={{ backgroundColor: 'white' }}>
      <div className="search-and-select-container">
   
        <IonSearchbar
            placeholder="Search for food"
            className="responsive-searchbar" // Set a fixed width for the search bar
          />
            <IonButton fill="clear" slot="end" onClick={(e) => { e.preventDefault(); handleNavigation('/AddToCartPage'); }} >
            
            <IonIcon icon={cart} color="dark" />
          </IonButton>
        </div>
        </IonToolbar>

<IonToolbar style={{ backgroundColor: 'white' }}>
<div className="search-and-select-container">
<AutocompleteSearch />
</div>
</IonToolbar>
</>
        
         )}
    </IonHeader>

     {/* Sign In Modal */}
     <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonContent>
          <div className="modal-content">
            <IonButton fill="clear" onClick={() => setShowModal(false)} className="close-btn">
              <IonIcon icon={closeOutline} />
            </IonButton>
            <IonTitle className="ion-text-center" style={{ marginTop: '20px' }}>
              Sign in or Sign up
            </IonTitle>

            <div className="sign-buttons-container">
      <IonButton
        className={`sign-btn ${activeButton === 'signIn' ? 'active' : ''}`}
        onClick={() => setActiveButton('signIn')}
        style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}
      >
        Sign In
      </IonButton>
      <IonButton
        className={`sign-btn ${activeButton === 'signUp' ? 'active' : ''}`}
        onClick={() => setActiveButton('signUp')}
        style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}
      >
        Sign Up
      </IonButton>
    </div>

   
    {activeButton === 'signIn' && (
         <>

            <p className="ion-text-center">Sign in to access your credits and discounts</p>

            <div className="login-options">
              <IonButton expand="block" className="social-btn google">
                <IonIcon slot="start" icon={logoGoogle} />
                Continue with Google
              </IonButton>

              <IonButton expand="block" className="social-btn facebook">
                <IonIcon slot="start" icon={logoFacebook} />
                Continue with Facebook
              </IonButton>

              <IonButton expand="block" className="social-btn apple">
                <IonIcon slot="start" icon={logoApple} />
                Continue with Apple
              </IonButton>

              <p className="ion-text-center">or continue with email</p>

            

              <IonItem>
               <IonInput label="Email" type="email" placeholder="email@domain.com"></IonInput>
              </IonItem>

              <IonButton expand="block" className="continue-btn" color="danger">
                Continue to Sign In
              </IonButton>

              <p className="ion-text-center terms">
                By continuing with the sign-in process, we may send you a one-time verification code
                via text message to the phone number associated with your account.
              </p>
            </div>
            </>
 )}

{activeButton === 'signUp' && (
  <>
<IonList>
      <IonItem>
        <IonInput labelPlacement="floating" value="">
          <div slot="label">
          First Name <IonText color="danger">(Required)</IonText>
          </div>
        </IonInput>
        </IonItem>

        <IonItem>
        <IonInput labelPlacement="floating" value="">
          <div slot="label">
          Last Name <IonText color="danger">(Required)</IonText>
          </div>
        </IonInput>
        </IonItem>

        <IonItem>
        <IonInput labelPlacement="floating" value="">
          <div slot="label">
          Email <IonText color="danger">(Required)</IonText>
          </div>
        </IonInput>
</IonItem>

<IonItem>
        <IonInput labelPlacement="floating"  value="">
          <div slot="label">
          Mobile Number <IonText color="danger">(Required)</IonText>
          </div>
        </IonInput>
</IonItem>

<IonItem>
        <IonInput labelPlacement="floating" type="password" >
          <div slot="label">
          Password <IonText color="danger">(Required)</IonText>
          </div>
        </IonInput>
</IonItem>
    </IonList>
    <IonButton expand="block" className="continue-btn" color="danger">
    Sign Up
 </IonButton>
 </>
  )}

          </div>
        </IonContent>
      </IonModal>

    
    </>
    
  );
};

export default Header;
