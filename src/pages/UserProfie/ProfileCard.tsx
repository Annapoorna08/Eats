import React, {  useEffect ,useState} from "react";
import { IonContent, IonPage, IonButton, IonItem, IonLabel, IonList, IonIcon } from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';
import './ProfileCard.css';
import Header from '../../components/MainComponent/Header'
import { useStatus } from '../../components/context/StatusContext';
import { checkName, setName } from "../../components/utils/preferencesUtil";
import { encryptText, decryptText } from '../../components/utils/encryptionUtil';
import {user} from '../../components/Model/user'
const ProfileCard = () => {

    const [email, setEmail] = useState<string | null>(null); // Initialize as null
    const [data, setData] = useState<user | null>(null);
    const fetchEmailId = async () => {
        const mail = await checkName("email_id");
        setEmail(mail); // Update state with fetched email
        enc(mail!);
      };
  
      const enc = async (plaintext: string) => {
        // Encrypt the text
      const encrypted = await encryptText(plaintext, 'Rc$15axis@2022Mx');
      //console.log('Encrypted:', encrypted);
      fetchData(encrypted);
    };

    useEffect(() => {
        // Fetch email ID when the component mounts
        fetchEmailId();
      }, []);

    const fetchData = async (email:string) => {
        try {
           // Prepare the request payload in JSON format
           const requestData = {
            email: email,
          };
    
          const response = await fetch(`http://localhost:8080/User/UserDetails`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Setting content type to JSON
            },
            body: JSON.stringify(requestData), // Convert the object to a JSON string
          });
          if (response.ok) {
            const result = await response.json(); // Assuming the response is in JSON format

            const userData: user = {
                id: result.id,
                userName: result.userName,
                userAddress1: result.userAddress1,
                userAddress2: result.userAddress2,
                userAddress3: result.userAddress3,
                mobileNo: result.mobileNo,
                email: result.email,
                userCity: result.userCity,
                userPostalCode: result.userPostalCode,
                userState: result.userState,
                geolocation: result.geolocation
            };

            setData(userData);
           // console.log(result);
            
    
          } else {
            console.error('Failed to load User Details');
          }
        } catch (error) {
          console.error('Error fetching User Details API:', error);
        }
       
      };
    

  return (
    <IonPage>
         <Header />
      <IonContent className="ion-padding colorful-background">
        {/* Profile Section */}
        <div className="profile-card modern-card">
          <h1 className="profile-name">{data?.userName}</h1>
          <p className="profile-details">
            
            <strong>+91 - {data?.mobileNo}</strong>
          </p>
          <p className="profile-details">{data?.email}</p>
          <IonButton expand="block" fill="solid" color="primary" className="edit-profile-button">
            Edit Profile
          </IonButton>
        </div>

        {/* Past Orders Section */}
        <div className="past-orders modern-card">
          <h2 className="section-title">Past Orders</h2>
          <IonList>
            {/* Order 1 */}
            <div className="order-card">
              <IonItem lines="none" className="order-item">
                <IonLabel>
                  <h3 className="restaurant-name">Telicherry Restaurant</h3>
                  <p className="order-location">Kannur Town</p>
                  <p className="order-price">₹567</p>
                  <p className="order-details">PERI PERI AL FAHAM HALF (1), Kerala Parotta (3), Chapati (7)</p>
                  <p className="order-time">November 9, 9:14 PM</p>
                  <p className="order-rating">
                    <strong>⭐ 5 | Loved it</strong>
                  </p>
                </IonLabel>
                <IonIcon icon={checkmarkCircleOutline} color="success" className="delivery-status-icon" />
              </IonItem>
              <div className="order-actions">
                <IonButton fill="outline" color="secondary" className="action-button">
                  Reorder
                </IonButton>
                <IonButton fill="outline" color="tertiary" className="action-button">
                  Rate Food
                </IonButton>
              </div>
            </div>
            <hr />

            {/* Order 2 */}
            <div className="order-card">
              <IonItem lines="none" className="order-item">
                <IonLabel>
                  <h3 className="restaurant-name">Thomson Bakers - Kakkanad</h3>
                  <p className="order-location">Kayamkulam</p>
                  <p className="order-price">₹1069</p>
                  <p className="order-details">Choco Vanilla Birthday Cake 1Kg (1)</p>
                  <p className="order-time">November 8, 7:28 PM</p>
                  <p className="order-rating">You haven't rated this delivery yet</p>
                </IonLabel>
                <IonIcon icon={checkmarkCircleOutline} color="success" className="delivery-status-icon" />
              </IonItem>
              <div className="order-actions">
                <IonButton fill="outline" color="secondary" className="action-button">
                  Reorder
                </IonButton>
                <IonButton fill="outline" color="tertiary" className="action-button">
                  Rate Food
                </IonButton>
              </div>
            </div>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfileCard;
