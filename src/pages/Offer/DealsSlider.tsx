// src/components/DealsSlider.tsx
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { IonCard, IonCardContent, IonIcon } from '@ionic/react';
import './DealsSlider.css'; // Custom styles for your slider
import OfferModal from '../OfferModel/OfferModal';

const DealsSlider: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null); // Track selected offer
  
  const slides = [
    {
      badge: 'SAVE X 2',
      title: 'Extra ₹25 Off',
      timer: 'ENDS IN 16h : 12m : 28s',
      image: '/assets/offer/save2x.png', // Replace with your image path
    },
    {
      badge: 'DEAL OF DAY',
      title: 'Items At ₹179',
      timer: 'ENDS IN 16h : 12m : 28s',
      image: '/assets/offer/deal-of-day.png', // Replace with your image path
    },
    
    // Add more slides as needed
  ];

  const handleSlideClick = (offer:any) => {
    setSelectedOffer(offer);
    setIsModalOpen(true); // Open modal with selected offer
  };

  return (
    <div className="deals-slider-container">
      <div className="slider-header">
        <h2>Deals for you</h2>
      </div>

      <Swiper
       
        slidesPerView={2.5} // Default number of slides
        spaceBetween={10} // Space between slides
        pagination={{ clickable: true }} // Enable clickable pagination
        breakpoints={{
          // Define breakpoints for responsive design
          320: {
            slidesPerView: 1, // 1 slide per view on small screens
            spaceBetween: 5, // Smaller space on small screens
          },
          640: {
            slidesPerView: 2, // 2 slides per view on medium screens
            spaceBetween: 10, // Space between slides
          },
          768: {
            slidesPerView: 2.5, // 2.5 slides per view on larger screens
            spaceBetween: 10, // Space between slides
          },
          1024: {
            slidesPerView: 3, // 3 slides per view on large screens
            spaceBetween: 15, // Space between slides
          },
        }}
      >
        {slides.map((slide, index) => (
     <SwiperSlide key={index} onClick={() => handleSlideClick(slide)}> {/* Handle click */}
            <IonCard className="deal-card">
              <IonCardContent className="deal-card-content">
                <img src={slide.image} alt={slide.title} className="deal-image" />
                <div className="deal-details">
                  <div className="deal-badge">{slide.badge}</div>
                  <h3>{slide.title}</h3>
                  <p>{slide.timer}</p>
                </div>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
        ))}
      </Swiper>

      <OfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        offerDetails={selectedOffer} // Pass selected offer details to the modal
      />
    </div>
  );
};

export default DealsSlider;
