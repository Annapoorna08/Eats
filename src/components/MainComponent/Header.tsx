import React, { useRef, useState,useEffect } from 'react';
import {IonHeader,IonToolbar,IonButtons,IonButton,IonIcon,useIonToast,IonTitle,IonItem,IonContent,IonModal,IonList,IonText,IonInput,IonSearchbar,IonCard,IonCardContent} from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Header.css'; // Import the CSS file
import Toast from '../utils/Toast';
import { encryptText } from '../utils/encryptionUtil';
import { closeOutline, cart,personCircle } from 'ionicons/icons';
import { getPlatform, isIOS, isAndroid, isWeb } from '../helpers/platformCheck'; // Import the helper functions
import { useStatus } from '../context/StatusContext';
import { removeName } from "../utils/preferencesUtil";
import AutocompleteSearch from '../helpers/AutocompleteSearch';
const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeButton, setActiveButton] = useState<'signIn' | 'signUp'>('signIn');
  const history = useHistory();
  const [present] = useIonToast();
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(''); 
  const [showToast, setShowToast] = useState(false);

  const [firstname , setFirstName] = useState('');
  const [lastname, setLastName]    = useState('');
  const [typeemailid, setEmailid]      = useState('');
  const [mobileno, setMobileNo]    = useState('');
  const [password, setPassword]    = useState('');
  const [conpassword, setConPassword]    = useState('');
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [isotp, setIsOTP] = useState(false);
  const inputRefs = useRef<(HTMLIonInputElement | null)[]>([]);


  const [loginpassword, setLoginPassword]    = useState('');
  const [loginemailid, setLoginEmailid]      = useState('');

  const { emailid, setIsEmail } = useStatus(); // Correct destructuring

  const handleNavigation = (link: string) => {
    history.push(link); // Adjust the path according to your routing setup
  };

  console.log(""+emailid);

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

  const handleResendOtp = () => {
    alert('OTP resent!');
    enc(typeemailid);
  };
 

  const handleInputChange = (e: CustomEvent) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format regex
    setEmailid(e.detail.value!);
    if (!typeemailid) {
      setError('Email is required');
    } else if (!emailRegex.test(typeemailid)) {
      setError('Please enter a valid email address');
    } else { 
      setError('');
      //Continue
      setEmailid(e.detail.value!);
    }
    
    
  };

 
    
  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (firstname === '' ) {
      setLoading(false);
      present({
        message: 'Please enter  First Name',
        duration: 4000,
        position: 'bottom',
        cssClass: 'text-white',
        color: 'danger',
      });
      return;
    }else if (lastname === '' ) {
      setLoading(false);
      present({
        message: 'Please enter  Last Name',
        duration: 4000,
        position: 'bottom',
        cssClass: 'text-white',
        color: 'danger',
      });
      return;
    }else if (typeemailid === '' ) {
      setLoading(false);
      present({
        message: 'Please enter Email',
        duration: 4000,
        position: 'bottom',
        cssClass: 'text-white',
        color: 'danger',
      });
      return;
    }
    else if (mobileno === '' ) {
      setLoading(false);
      present({
        message: 'Please enter Mobile Number',
        duration: 4000,
        position: 'bottom',
        cssClass: 'text-white',
        color: 'danger',
      });
      return;
    }
    else if (password === '' ) {
      setLoading(false);
      present({
        message: 'Please enter Password',
        duration: 4000,
        position: 'bottom',
        cssClass: 'text-white',
        color: 'danger',
      });
      return;
    }
    else if (conpassword === '' ) {
      setLoading(false);
      present({
        message: 'Please enter Confirm Password',
        duration: 4000,
        position: 'bottom',
        cssClass: 'text-white',
        color: 'danger',
      });
      return;
    }
    else if(conpassword !== '' && password !== '' )
    {
      if(password === conpassword)
      {

        //Continue
        enc(typeemailid);
      }else{
        setLoading(false);
        present({
        message: 'Please enter Password not matching',
        duration: 4000,
        position: 'bottom',
        cssClass: 'text-white',
        color: 'danger',
      });
      }
    }else{
      enc(typeemailid);
    }

  }

  const handleInputChange1 = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < otp.length - 1) {
      inputRefs.current[index + 1]?.setFocus();
    }
    if (newOtp.every((digit) => digit)) {
      //console.log("OTP entered:", newOtp.join(''));
    }
  };

  const enc = async (plaintext: string) => {
    // Encrypt the text
  const encrypted = await encryptText(plaintext, 'Rc$15axis@2022Mx');
  //console.log('Encrypted:', encrypted);
  sendOTPRequest(encrypted);
};


const encpassword = async (plaintext: string) => {
  // Encrypt the text
const encrypted = await encryptText(plaintext, 'Rc$15axis@2022Mx');
sendRequestsignup(encrypted);

};

const sendRequestsignup = async (enc_password: string,) => {
  //API URL
  const url = 'http://localhost:8080/User/insert';
  // Prepare the request payload in JSON format
  const requestData = {
    userName: firstname+" "+lastname,
    email: typeemailid,
    password:enc_password,
    mobileNo:mobileno
  };

  try {
    const response = await fetch(url, {
      method: 'POST', // or 'PUT', depending on your API
      headers: {
        'Content-Type': 'application/json', // Setting content type to JSON
      },
      body: JSON.stringify(requestData), // Convert the object to a JSON string
    });

    const result = await response.text();

    if(result === "User already added successfully.")
    {
      showToastWithMessage('User already added');
      setLoading(false);
    }else{
      showToastWithMessage('User added successfully');
      setShowModal(false);
      setIsEmail(typeemailid);
    }

    if (response.ok) {
     
    } else {
      console.error('Error uploading files');
    }
  
  } catch (error) {
    console.error('Error:', error);
     showToastWithMessage('Somthing went wrong');
  }
};

const handleContinue = () => {

  const sendRequest2 = async (toEmailId: string, otpCode: string) => {
    const url = 'http://localhost:8080/OTP/verify';
  
    // Prepare the request payload in JSON format
    const requestData = {
      toEmailId: toEmailId,
      otpCode: otpCode
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST', // or 'PUT', depending on your API
        headers: {
          'Content-Type': 'application/json', // Setting content type to JSON
        },
        body: JSON.stringify(requestData), // Convert the object to a JSON string
      });
  
      const result = await response.json(); // Assuming the response is in JSON format
  
     
      if (!result) 
      {
        showToastWithMessage('The OTP you entered is invalid. Please re-enter.');
      }
      const message = result.otpCode;
  
      if (message === otp.join('')) {
       // setLogin_name_en(true);
       encpassword(typeemailid);
        setIsOTP(false);
        setError(''); 
      }else{
        showToastWithMessage('The OTP you entered is invalid. Please re-enter.');
      }
    } catch (error) {
      console.error('Error:', error);
       showToastWithMessage('The OTP you entered is invalid. Please re-enter.');
    }
  };
  
  sendRequest2(typeemailid,otp.join(''));
  //alert(`Entered OTP: ${otp.join('')}`);
};


  const Signout = async () => {
    removeName("email_id");
    setIsEmail(null);

  }


//Login API 
  const loginapi = async () => {
  //encrypted User name and password
  const encrypted_username = await encryptText(loginemailid, 'Rc$15axis@2022Mx');
  const encrypted_password = await encryptText(loginpassword, 'Rc$15axis@2022Mx');

  // Prepare the request payload in JSON format
  const requestData = {
      email: encrypted_username,
      password : encrypted_password
    };
  try {
    const response = await fetch(`http://localhost:8080/User/Login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', // Setting content type to JSON
        },
        body: JSON.stringify(requestData), // Convert the object to a JSON string
    });
    if (response.ok) {
      const data = await response.json();
      if (data && data.login_first === "False") {
          setLoading(false);
          setLoginEmailid('');
          setLoginPassword('');
          setShowModal(false);
          setIsEmail(loginemailid);
           return true; // Login successful
      }
      else {
          setLoading(false);
    present({
      message: 'Invalid login. Please check your username or password.',
      duration: 4000,
      position: 'bottom',
      cssClass: 'text-white',
      color: 'danger',
    });
        return false; // Login failed (invalid credentials)

      }
    } else {
      showToastWithMessage("Invalid login. Please check your username or password");
      setLoading(false);
      return false; // Server error or response is not OK
    }
  } catch (error) {
    console.error('Error fetching Login API:', error);
  }
 
};


  const sendOTPRequest = async (text: string) => {
    const url = 'http://localhost:8080/OTP';
   
    try {
      const response = await fetch(url, {
        method: 'POST', // or 'PUT', depending on your API
        headers: {
          'Content-Type': 'text/plain', // Setting content type to text
        },
        body: text, // Sending data as plain text
      });

      const result = await response.json(); // Assuming the response is in JSON format

      const message = result.message;

      if (message === 'Email has been Sent successfully') {
        //setShowToast(true); // Show toast for success
        showToastWithMessage('OTP has been sent successfully');

        setIsOTP(true)
      }
      setResponseData(result);
      //console.log('Response:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to show the toast with a specific message
  const showToastWithMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.setFocus();
    }
  };

  return (
    <>
    <IonHeader>
      <IonToolbar style={{ backgroundColor: 'white' }}>
        {/* Logo on the left */}
        <IonButtons slot="start">
        <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/Home'); }}>
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

{emailid ? (
  <>
    {/* Button for navigation */}
    <IonButton
      fill="clear"
      slot="end"
      onClick={(e) => {
        e.preventDefault();
        handleNavigation('/ProfileCard');
      }}
    >
      <IonIcon icon={personCircle} color="dark" />
    </IonButton>

    <div className="auth-buttons">
      <div className="desktop-buttons">
        {/* Sign In and Sign Up Buttons */}
        <IonButton onClick={() => Signout()}>Sign out</IonButton>
        </div>
        </div>
  </>
) : (
  <>
    <div className="auth-buttons">
      <div className="desktop-buttons">
        {/* Sign In and Sign Up Buttons */}
        <IonButton onClick={() => setShowModal(true)}>Sign In</IonButton>

        
        {/* Cart Button */}
        <IonButton
          fill="clear"
          slot="end"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/AddToCartPage');
          }}
        >
          <IonIcon icon={cart} color="dark" />
        </IonButton>
      </div>
    </div>
  </>
)}


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
              <IonItem>
               <IonInput label="Email" value={loginemailid} type="email" placeholder="email@domain.com"  onIonChange={(e) => setLoginEmailid(e.detail.value!)}></IonInput>
              </IonItem>
              <IonItem>
               <IonInput label="Password" value={loginpassword} type="password" placeholder=""  onIonChange={(e) => setLoginPassword(e.detail.value!)}></IonInput>
              </IonItem>
              <IonButton expand="block" className="continue-btn" color="danger"   onClick={loginapi}>
                Continue to Sign In
              </IonButton>
            </div>
            </>
 )}

{activeButton === 'signUp' && !isotp  &&(

  <>
<IonList>

      <IonItem>
        <IonInput labelPlacement="floating" value={firstname}
              onIonChange={(e) => setFirstName(e.detail.value!)}>
          <div slot="label">
          First Name <IonText color="danger">(Required)</IonText>
          </div>
        </IonInput>
        </IonItem>

        <IonItem>
        <IonInput labelPlacement="floating" value={lastname}
              onIonChange={(e) => setLastName(e.detail.value!)}>
          <div slot="label">
          Last Name <IonText color="danger">(Required)</IonText>
          </div>
        </IonInput>
        </IonItem>

        <IonItem>
        <IonInput type="email" labelPlacement="floating" value={typeemailid}
               onIonInput={handleInputChange}>
          <div slot="label">
          Email <IonText color="danger">(Required)</IonText>
          </div>
        </IonInput>
        </IonItem>

        <IonItem>
        <IonInput type="number" labelPlacement="floating"  value={mobileno}
              onIonChange={(e) => setMobileNo(e.detail.value!)}>
          <div slot="label">
          Mobile Number <IonText color="danger">(Required)</IonText>
          </div>
        </IonInput>
        </IonItem>

        <IonItem>
        <IonInput type="password" labelPlacement="floating"  value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}>
          <div slot="label">
          Password <IonText color="danger">(Required)</IonText>
          </div>
        </IonInput>
        </IonItem>

        <IonItem>
        <IonInput type="password" labelPlacement="floating"  value={conpassword}
              onIonChange={(e) => setConPassword(e.detail.value!)}>
          <div slot="label">
          Confirm Password <IonText color="danger">(Required)</IonText>
          </div>
        </IonInput>
        </IonItem>


    </IonList>
    <IonButton  expand="block" className="continue-btn" color="danger"  disabled={
                      firstname?.length === 0 || password?.length === 0 || loading
                    }
                    onClick={signup}>
  
    {loading ? 'Please wait' : 'Sign Up'}
 </IonButton>
  {/* Display an error message if the field is required but empty or invalid */}
  {error && <IonText color="danger">{error}</IonText>}
 <p className="ion-text-center terms">
                By continuing with the sign-in process, we may send you a one-time verification code
                via text message to the phone number associated with your account.
              </p>
 </>
  )}
  {isotp && (
            <IonCard className="get-started-card">
              <IonCardContent>
                <IonText className="card-title">
                  <h2>Enter OTP</h2>
                </IonText>
                <p className="otp-instruction">Enter OTP sent on Email {typeemailid}</p>
                <div className="otp-input-container">
                  {otp.map((_, index) => (
                    <IonInput
                      key={index}
                      type="text"
                      maxlength={1}
                      ref={(el) => (inputRefs.current[index] = el)}
                      onIonInput={(e) => handleInputChange1(index, e.detail.value!)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="otp-input"
                      value={otp[index]}
                      inputMode="numeric"
                    />
                  ))}
                </div>
                <IonText color="primary" onClick={handleResendOtp} className="resend-otp">
                  Resend OTP
                </IonText>
                <IonButton
                  expand="block"
                  disabled={otp.some((digit) => digit === '')}
                  onClick={handleContinue}
                  className="continue-button"
                >
                  Continue
                </IonButton>
                <IonText className="terms-text">
                  By logging in, I agree to Eats <a href="#">terms & conditions</a>
                </IonText>
              </IonCardContent>
            </IonCard>
          )}

  
          </div>

          {/* Use the reusable Toast component */}
        <Toast
          isOpen={showToast}
          onClose={() => setShowToast(false)}
          message={toastMessage} // Pass the dynamic message here
        />
        </IonContent>
      </IonModal>

    
    </>
    
  );
};

export default Header;
