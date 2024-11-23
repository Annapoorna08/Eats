
import { IonPage, IonContent,IonCard, IonIcon, IonSearchbar, IonToggle,IonLabel,IonButton,IonCardHeader,IonCardTitle,IonCardContent } from '@ionic/react';

import DealsSlider from '../Offer/DealsSlider';
import Header from '../../components/MainComponent/Header'
import Footertag from '../../components/MainComponent/Footer'
import { star, locationOutline, timeOutline } from 'ionicons/icons';
import RestaurantPage from '../Common Page/RestaurantPage';
import { setName, checkName, removeName } from '../../components/utils/preferencesUtil'; 
import React, { useEffect, useState } from 'react';
import './Makeorder.css';
import { useLocation } from 'react-router-dom';
import {Restaurant} from '../../components/Model/Restaurant' 
import MenuIteam from '../dishes/MenuIteam'
import {MenuItem} from '../../components/Model/Menumodel' 

interface LocationState {
  restaurant: Restaurant;
}

const Makeorder: React.FC = () => {
  const location = useLocation<LocationState>(); // Tell TypeScript about the type of location.state
  const restaurant = location.state?.restaurant;
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [restname, setRestName] = useState<string | null>(null);
  const getRestName = async () => {
    const fetchedName = await checkName('rest_name');
    setRestName(fetchedName);
  };
  

  useEffect(() => {
    getRestName();
    fetchData(restaurant.id.toString());
  }, []);

  
//TO Get Menu Iteam For Restaurant
  const fetchData = async (id:string) => {
    try {
       // Prepare the request payload in JSON format
       const requestData = {
        id: id,
      };

      const response = await fetch(`http://localhost:8080/menu/Restaurant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Setting content type to JSON
        },
        body: JSON.stringify(requestData), // Convert the object to a JSON string
      });
      if (response.ok) {
        const result = await response.json(); // Assuming the response is in JSON format
        setMenu(result );

      } else {
        console.error('Failed to load restaurant Menu Details');
      }
    } catch (error) {
      console.error('Error fetching restaurant Menu Details API:', error);
    }
   
  };
  


  return (
    <IonPage>
     <Header />
     <IonContent >

     

     
      <div className="restaurant-card-container">
  <IonCard className="restaurant-card">
    {/* Restaurant Name */}
    <h2 className="restaurant-name">{restaurant.restaurantName}</h2>

    {/* Restaurant Info */}
    <div className="restaurant-info">
      <div className="rating">
        <IonIcon icon={star} />
        <span>{restaurant.rating}</span>
      </div>
    </div>

    {/* Tags */}
    <div className="tags">
      <a href="#">{restaurant.cuisine}</a>
    </div>

    {/* Outlet and Delivery Info */}
    <div className="outlet-info">
      <div className="location">
        <IonIcon icon={locationOutline} />
        <span>Outlet</span>&nbsp;
        <span className="outlet-name">{restaurant.restaurantCity}</span>
      </div>
      <div className="delivery-time">
        <IonIcon icon={timeOutline} />
        <span>{restaurant.time}</span>
      </div>
    </div>
  </IonCard>
</div>

          {/* Deals Section */}
          <DealsSlider />
          <div className="card-container">
          {/* Menu Search */}
          <div className="menu-section">
            <h3>Menu</h3>
            <MenuIteam  menumodel={menu} />
          </div>
          </div>
          <Footertag/>
          
      </IonContent>

    </IonPage>
  );
};

export default Makeorder;
