import React, { useState } from 'react';
import { IonPage, IonContent,IonCard, IonIcon, IonSearchbar, IonToggle,IonLabel,IonButton,IonCardHeader,IonCardTitle,IonCardContent } from '@ionic/react';
import DealsSlider from './DealsSlider'
import Header from '../components/Header' 
import Footertag from '../components/Footer'
import { star, locationOutline, timeOutline } from 'ionicons/icons';
import RestaurantPage from './RestaurantPage';

import './MenuPage.css';
const MenuPage = () => {

  const [isnonVeg, setIsnonVeg] = useState(false);
  const [isVeg, setIsVeg] = useState(false);

  const handleToggleChange = (event: CustomEvent) => {
    setIsVeg(event.detail.checked);

  };
  const [isBestseller, setIsBestseller] = useState(false);
  const handleButtonClick = () => {
    setIsBestseller(!isBestseller); // Toggle the Bestseller state
  };



  const rerestaurants_near_me = [
    { name: 'McDonald', rating:'4.0 (10k+) ',distance: ' 3.2 mi' ,time:'32 min' ,offer: 'Buy 1, get 1 free', type:'Chinese, Asian, Tibetan, Desserts', shortloc:'M G Road',  image: '/assets/icons/burgerking.png' },
    { name: 'KFC', rating:'4.0',distance: ' 3.4 mi' ,time:'45 min' ,offer: 'Free item on $30+', type:'Chinese, Asian, Tibetan, Desserts', shortloc:'M G Road', image: '/assets/icons/kfc.jpg' },
    { name: 'Popeyes Louisiana Kitchen', rating:'4.0',offer: 'Buy 1, get 1 free',type:'Chinese, Asian, Tibetan, Desserts', shortloc:'M G Road', image: '/assets/icons/food4.png' },
    { name: 'MR Halal WaterVliet', rating:'4.0',ffer: 'Buy 1, get 1 free', type:'Chinese, Asian, Tibetan, Desserts', shortloc:'M G Road' ,image: '/assets/icons/halal-image.jpg' },
    { name: 'Chinese Wok',rating:'4.0 (10k+) ', offer: '$4 off on $25+', type:'Chinese, Asian, Tibetan, Desserts', shortloc:'M G Road',image: 'path/to/bowledco-image.jpg' },
    { name: 'Ophelia’s', rating:'4.0',offer: '25% off, up to $10',type:'Chinese, Asian, Tibetan, Desserts', shortloc:'M G Road', image: 'path/to/ophelias-image.jpg' },
    { name: 'Ophelia’s', rating:'4.0',offer: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
    { name: 'Ophelia’s', rating:'4.0',offer: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
    { name: 'Ophelia’s', rating:'4.0',offer: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
    { name: 'Ophelia’s', rating:'4.0',offer: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
    { name: 'Ophelia’s', rating:'4.0',offer: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
    { name: 'Ophelia’s', rating:'4.0',offer: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
    { name: 'Ophelia’s', rating:'4.0',offer: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
    { name: 'Ophelia’s', rating:'4.0',offer: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
    { name: 'Ophelia’s', rating:'4.0',offer: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
    { name: 'Ophelia’s', offer: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
    { name: 'Ophelia’s', offer: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
    { name: 'Ophelia’s', offer: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
    { name: 'Ophelia’s', offer: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
    { name: 'Ophelia’s', offer: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
  ];
  

  return (
    <IonPage>
     
     <Header />
      <IonContent >
      <div className="restaurant-card-container">
          <IonCard className="restaurant-card">
            {/* Restaurant Name */}
            <h2>KFC</h2>
            
            {/* Restaurant Info */}
            <div className="restaurant-info">
              <div className="rating">
                <IonIcon icon={star} />
                <span>4.3 (8.2K+ ratings)</span>
              </div>
              <span className="price">₹400 for two</span>
            </div>

            {/* Tags */}
            <div className="tags">
              <a href="#">Burgers</a>, <a href="#">Fast Food</a>
            </div>

            {/* Outlet and Delivery Info */}
            <div className="outlet-info">
              <div className="location">
                <IonIcon icon={locationOutline} />
                <span>Outlet</span>
                <span className="outlet-name">Kannur</span>
              </div>
              <div className="delivery-time">
                <IonIcon icon={timeOutline} />
                <span>40-45 mins</span>
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

          <RestaurantPage title="Top Picks" restaurants={rerestaurants_near_me} />

        

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
