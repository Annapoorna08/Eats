import {
    IonTitle,
    IonButton,
    IonCard,
    IonCardContent,
  } from '@ionic/react';
  import React, { useState } from 'react';
  import './list.css';
  
  const foodOffers = [
    { title: 'Burger King', offer: 'Buy 1, get 1 free', image: '/assets/icons/burgerking.png' },
    { title: 'Wingstop', offer: 'Free item on $30+', image: '/assets/icons/food3.png' },
    { title: 'Popeyes Louisiana Kitchen', offer: 'Buy 1, get 1 free', image: '/assets/icons/food4.png' },
    { title: 'MR Halal WaterVliet', offer: 'Buy 1, get 1 free', image: '/assets/icons/halal-image.jpg' },
    { title: 'Bowled Co', offer: '$4 off on $25+', image: 'path/to/bowledco-image.jpg' },
    { title: 'Ophelia’s', offer: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
    // ... Add other offers
  ];
  
  const ITEMS_PER_PAGE = 8;
  
  const List: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(foodOffers.length / ITEMS_PER_PAGE);
  
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
  
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentOffers = foodOffers.slice(startIndex, endIndex);
  
    return (
      <>
        <IonTitle>Offers for You</IonTitle>
        <div className="pagination-container">
          <span className="pagination-text">See All</span>
          <IonButton className="prev-button" onClick={prevPage} disabled={currentPage === 0}>
            &#60;
          </IonButton>
          <IonButton className="next-button" onClick={nextPage} disabled={currentPage === totalPages - 1}>
            &#62;
          </IonButton>
        </div>
  
        <div className="scrollable-cards-container">
          {currentOffers.map((food, index) => (
            <IonCard key={index} className="scrollable-card">
              <img
                style={{
                  height: '167px', 
                  margin: '0 auto', 
                }}
                src={food.image}
                alt={food.title}
              />
              <IonCardContent>
                <h2>{food.title}</h2>
                <p>{food.offer}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </>
    );
  };
  
  export default List;
  