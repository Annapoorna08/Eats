import React, { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { chevronBackOutline, chevronForwardOutline, star } from 'ionicons/icons';
import './RestaurantPage.css';

interface Restaurant {
  name: string;
  rating: number;
  distance: string;
  time: string;
  type: string;
  shortloc: string;
  image: string;
}



interface RestaurantPageProps {
    restaurants: Restaurant[];  // Accept restaurants as a prop
    title: string;              // Accept title as a prop
  }

const RestaurantPage: React.FC<RestaurantPageProps> = ({ restaurants,title }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 3; // Display two restaurants per page
  const totalPages = Math.ceil(restaurants.length / pageSize);

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

  const handleClick = (restaurantName: string) => {
    alert(`You clicked on ${restaurantName}`);
  };

  return (
    <div className="restaurant-page">
      <h2>{title}</h2>
      <div className="pagination-container">
        <div className="navigation-buttons">
          <IonButton
            className="nav-button"
            fill="clear"
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            <IonIcon icon={chevronBackOutline} />
          </IonButton>
          <IonButton
            className="nav-button"
            fill="clear"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
          >
            <IonIcon icon={chevronForwardOutline} />
          </IonButton>
        </div>
      </div>

      <div className="scrollable-cards-container2">
        {restaurants
          .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
          .map((restaurant, index) => (
            <IonCard
              key={index}
              className="scrollable-card2"
              onClick={() => handleClick(restaurant.name)}
              button
              style={{
                backgroundImage: `url(${restaurant.image})`,  // Set image as background
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '250px',  // Set card height
                position: 'relative',
              }}
            >
              
              <IonCardContent>
              <h2 className="h2">{restaurant.name}</h2> {/* Applying the class */}     
                <p>{restaurant.type}</p>
                <p>{restaurant.shortloc}</p>
              </IonCardContent>
            </IonCard>
          ))}
      </div>
    </div>
  );
};

export default RestaurantPage;
