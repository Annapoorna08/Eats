import React, { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { chevronBackOutline, chevronForwardOutline, star } from 'ionicons/icons';
import './RestaurantPage.css';
import { useHistory } from 'react-router-dom';
import { setName } from '../../components/utils/preferencesUtil'; 
import {Restaurant} from '../../components/Model/Restaurant' 

interface RestaurantPageProps {
    restaurants: Restaurant[];  // Accept restaurants as a prop
    title: string;              // Accept title as a prop
  }

const RestaurantPage: React.FC<RestaurantPageProps> = ({ restaurants,title }) => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(0);
  var pageSize = 4; // Display two restaurants per page
  const totalPages = Math.ceil(restaurants.length / pageSize);

  



  if( title.includes("Restaurants with online food delivery in"))
  {
    pageSize=restaurants.length
  }

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClick = (restaurant: Restaurant) => {
    history.push({
      pathname: '/Makeorder',
      state: { restaurant }, // Passing the entire restaurant object
    });
  };

   const saveName = async (rest_nam: string) => {
    await setName('rest_name',rest_nam);
    };

  return (


    <>
  
    <div className="pagination-container">
      <div className="navigation-buttons">
        <IonButton className="nav-button" fill="clear" onClick={prevPage} disabled={currentPage === 0}>
          <IonIcon icon={chevronBackOutline} />
        </IonButton>
        <IonButton className="nav-button" fill="clear" onClick={nextPage} disabled={currentPage === totalPages - 1}>
          <IonIcon icon={chevronForwardOutline} />
        </IonButton>
      </div>
    </div>
    <h2><b> {title} </b></h2>

<div className="scrollable-cards-container2">
{restaurants
          .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
          .map((restaurant, index) => (
            <IonCard key={index} className="scrollable-card2"  onClick={(e) => { e.preventDefault(); handleClick(restaurant)}}  button>
              <img
                style={{
                  height: '200px',
                  width:'327px', // Adjust height
                  marginRight:'auto',
                  margin: '5 140px', // Space between logo and menu button
               
                }}
                src={restaurant.image}
                alt={restaurant.restaurantName}
              />
              <IonCardContent>
              <h2><strong>{restaurant.restaurantName}</strong></h2>
              <p>
               <IonIcon icon={star} />
                 {restaurant.rating ? restaurant.rating : 'New'} 
                <b> {restaurant.time}</b>
              </p>

                <p>{restaurant.cuisine}</p>
                <p>{restaurant.restaurantCity}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </div>

        </>
  );
};

export default RestaurantPage;
