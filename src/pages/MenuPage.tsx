
import { IonPage, IonContent,IonCard, IonIcon, IonSearchbar, IonToggle,IonLabel,IonButton,IonCardHeader,IonCardTitle,IonCardContent } from '@ionic/react';
import DealsSlider from './DealsSlider'
import Header from '../components/Header' 
import Footertag from '../components/Footer'
import { star, locationOutline, timeOutline } from 'ionicons/icons';
import RestaurantPage from './RestaurantPage';
import { setName, checkName, removeName } from '../components/utils/preferencesUtil'; 
import React, { useEffect, useState } from 'react';
import './MenuPage.css';
import { useLocation } from 'react-router-dom';

interface Restaurant {
  name: string;
  rating: number;
  distance: string;
  time: string;
  type: string;
  shortloc: string;
  image: string;
}

interface LocationState {
  restaurant: Restaurant;
}

const MenuPage: React.FC = () => {

  const [isnonVeg, setIsnonVeg] = useState(false);
  const [isVeg, setIsVeg] = useState(false);
  const location = useLocation<LocationState>(); // Tell TypeScript about the type of location.state
  const restaurant = location.state?.restaurant;
  
  const [restname, setRestName] = useState<string | null>(null);

  const getRestName = async () => {
    const fetchedName = await checkName('rest_name');
    setRestName(fetchedName);
  };

  const handleToggleChange = (event: CustomEvent) => {
    setIsVeg(event.detail.checked);

  };
  const [isBestseller, setIsBestseller] = useState(false);
  const handleButtonClick = () => {
    setIsBestseller(!isBestseller); // Toggle the Bestseller state
  };

  useEffect(() => {
    getRestName();
  }, []);

  

  

  const restaurants_near_me: Restaurant[] = [
    {
      name: "Domino's Pizza",
      rating: 4.2,
      distance: "1.2 km",
      time: "10 mins",
      type: "Fast Food",
      shortloc: "Downtown",
      image: "/assets/Restaurant/Dominos.jpeg",
    },
    {
      name: "Starbucks",
      rating: 4.5,
      distance: "0.5 km",
      time: "5 mins",
      type: "Coffee",
      shortloc: "City Center",
      image: "/assets/Restaurant/Dominos.jpeg",
    },
    // Add more restaurants as needed
  ];
  
  

  return (
    <IonPage>
     
     <Header />
      <IonContent >
      <div className="restaurant-card-container">
          <IonCard className="restaurant-card">
            {/* Restaurant Name */}
            <h2>{restaurant.name}</h2>
            
            {/* Restaurant Info */}
            <div className="restaurant-info">
              <div className="rating">
                <IonIcon icon={star} />
                <span>{restaurant.rating}</span>
              </div>
              <span className="price">₹400 for two</span>
            </div>

            {/* Tags */}
            <div className="tags">
              <a href="#"> {restaurant.type}</a>
            </div>

            {/* Outlet and Delivery Info */}
            <div className="outlet-info">
              <div className="location">
                <IonIcon icon={locationOutline} />
                <span>Outlet</span>&nbsp;
                <span className="outlet-name">{restaurant.shortloc}</span>
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

          {/* Menu Search */}
          <div className="menu-section">
            <h3>Menu</h3>
           
          </div>
          <IonSearchbar placeholder="Search for dishes" />
          <br />
          <div className="toggle-container"> 
          <IonToggle checked={isnonVeg} onIonChange={e => setIsnonVeg(e.detail.checked)} className="custom-toggle-veg"/>
          <IonToggle checked={isVeg} onIonChange={e => setIsVeg(e.detail.checked)} className="toggle-nonveg"/>
          <IonButton className={`bestseller-button ${isBestseller ? 'active' : ''}`}  onClick={handleButtonClick} >Bestseller</IonButton>
          </div>

          <RestaurantPage title="Top Picks" restaurants={restaurants_near_me} />

        

        <br /><br></br>
          {/* Top Picks */}
          <div className="top-picks">
            <h3>Top Picks</h3>
            {/* Add items here */}
          </div>

          <Footertag/>
        

      </IonContent>
    </IonPage>
  );
};

export default MenuPage;
