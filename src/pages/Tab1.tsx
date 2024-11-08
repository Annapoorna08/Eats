import {
  IonContent,
  IonPage,
  IonSelectOption,
  IonSelect,
  IonButton,
  IonCard,
  IonIcon,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import './Tab1.css';
import Footertag from '../components/Footer'
import Header from '../components/Header'
import { chevronForwardOutline, chevronBackOutline ,star,chevronDown,pricetag} from 'ionicons/icons';

import HorizontalScroll from '../components/HorizontalScroll';


const foodOffers = [
  { offer: 'Get 50% off', description: 'Use code EATS50 & get 50% off on orders above ₹149. Maximum discount: ₹100.' },
  { offer: 'Get flat ₹75', description: 'Get flat ₹75 discount using RBL Bank Credit Cards Flat ₹75 discount on orders above ₹500' },
  { offer: 'Get 20% off', description: 'Use code TRYNEW & get 20% off on orders above ₹199. Maximum discount: ₹50.' },

];

const spfoodOffers = [
  { title: 'Burger King',offer: 'Buy 1, get 1 free', image: '/assets/icons/burgerking.png' },
  { title: 'Wingstop', rating:'4.0',offer: 'Free item on $30+', image: '/assets/icons/food3.png' },
  { title: 'Popeyes Louisiana Kitchen',rating:'4.0', offer: 'Buy 1, get 1 free', image: '/assets/icons/food4.png' },
  { title: 'MR Halal WaterVliet', rating:'4.0',offer: 'Buy 1, get 1 free', image: '/assets/icons/halal-image.jpg' },
  { title: 'Bowled Co', offer: '$4 off on $25+', image: 'path/to/bowledco-image.jpg' },
];


const rerestaurants = [
  { name: 'Domino\'s Pizza', rating:'4.4 (4.2K+ ratings)',time:'25-30 mins' ,offer: '₹400 for two', type:'Pizzas', shortloc:'Kollam',  image: '/assets/Restaurant/Dominos.jpeg' },
  { name: 'Pizza Hut', rating:'4.3 (3.2K+ ratings)',time:'25-30 mins' ,offer: '₹350 for two', type:'Pizzas', shortloc:'Kollam', image: '/assets/Restaurant/Pizza Hut.jpeg' },
  { name: 'KFC', rating:'4.4 (12K+ ratings)',time:'25-30 mins',offer: '400 for two',type:'Burgers', shortloc:'Kollam', image: '/assets/Restaurant/KFC.jpeg' },
  { name: 'McDonald\'s', rating:'4.0 (12K+ ratings)',time:'25-30 mins',offer: '400 for two',type:'Burgers', shortloc:'Kollam', image: '/assets/Restaurant/McDonald.jpeg' },
  { name: 'Ramees', rating:'4.4 (29K+ ratings)',time:'30-35 mins',offer: '₹400 for two',type:'South Indian', shortloc:'Kollam', image: '/assets/Restaurant/Ramees.jpeg' },
  { name: 'Gee Bee Restaurant', rating:'4.3 (17K+ ratings)',time:'25-30 mins',offer: '₹200 for two',type:'South Indian', shortloc:'Kollam', image: '/assets/Restaurant/Gee Bee Restaurant.jpeg' },
];

const rerestaurants_nearme = [
  { name: 'Quilon Foods', rating:'4.0 (10k+) ',distance: ' 3.2 mi' ,time:'32 min' ,offer: 'Buy 1, get 1 free', type:'Chinese, Asian, Tibetan, Desserts', shortloc:'M G Road',  image: '/assets/icons/burgerking.png' },
  { name: 'Pizza Hut', rating:'4.0',distance: ' 3.4 mi' ,time:'45 min' ,offer: 'Free item on $30+', type:'Chinese, Asian, Tibetan, Desserts', shortloc:'M G Road', image: '/assets/icons/kfc.jpg' },
  { name: 'KFC', rating:'4.0',offer: 'Buy 1, get 1 free',type:'Chinese, Asian, Tibetan, Desserts', shortloc:'M G Road', image: '/assets/icons/food4.png' },
  { name: 'McDonald\'s', rating:'4.0',ffer: 'Buy 1, get 1 free', type:'Chinese, Asian, Tibetan, Desserts', shortloc:'M G Road' ,image: '/assets/icons/halal-image.jpg' },
  { name: 'Qahwa, Karicode',rating:'4.0 (10k+) ', offer: '$4 off on $25+', type:'Chinese, Asian, Tibetan, Desserts', shortloc:'M G Road',image: 'path/to/bowledco-image.jpg' },
  { name: 'Ramees', rating: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
  { name: 'Gee Bee Restaurant', rating: '25% off, up to $10', image: 'path/to/ophelias-image.jpg' },
];



const ITEMS_PER_PAGE = 3;

const Tab1: React.FC = () => {
  const location='Kollam';
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages_rerestaurants = Math.ceil(rerestaurants.length / ITEMS_PER_PAGE);

  //const totalPages_rerestaurants = Math.ceil(rerestaurants.length / ITEMS_PER_PAGE);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextPage = () => {
    if (currentPage < totalPages_rerestaurants - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };


  const seeall = () => {
   
  };

  const handleClick = () => {
   // console.log('Card clicked:', rerestaurants.name);
    history.push('/MenuPage'); // Navigate to restaurant details page
  };
  

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOffers = foodOffers.slice(startIndex, endIndex);
  const onlycurrentOffers = spfoodOffers.slice(startIndex, endIndex);
  const currentrerestaurants = rerestaurants.slice(startIndex, endIndex);

  const rerestaurants_near_me = rerestaurants_nearme.slice(startIndex, endIndex);
  return (
    <IonPage>
         <Header />
       
      <IonContent >
          <HorizontalScroll />

        
          <div className="navigation-buttons">

          <IonSelect
        interface="popover" // This will open as a dropdown
        placeholder="Select"
         className="custom-dropdown"
         style={{ paddingLeft: '30px', borderRadius: '20px', width: '200px' }} 
      >
        <IonSelectOption value="option1">Option 1</IonSelectOption>
        <IonSelectOption value="option2">Option 2</IonSelectOption>
        <IonSelectOption value="option3">Option 3</IonSelectOption>
      </IonSelect>
      <IonIcon icon={chevronDown} className="custom-dropdown-icon" />


          <IonButton className="custom-button" fill="clear" onClick={seeall} >
          <IonIcon icon={pricetag} slot="start"/> Offers
          </IonButton>

          <IonButton className="custom-button" fill="clear" onClick={seeall} >
          Pickup
          </IonButton>

          <IonButton className="custom-button" fill="clear" onClick={seeall} >
          Under 30 Min 
          </IonButton>
          </div>
       
       
          <div className="card-container">

{currentOffers.map((foodOffers, index) => (

<IonCard className="scroll-card">

  <IonCardHeader>
    <IonCardTitle>{foodOffers.offer}</IonCardTitle>
  </IonCardHeader>
  <IonCardContent>
    <p className="text-wrap">{foodOffers.description}</p>
    <IonButton expand="block" color="primary">Order Now</IonButton>
  </IonCardContent>

</IonCard>
))}
</div>



{/* 
<h2>AI Sugestion Restaurant</h2> 
<div className="pagination-container">       
       <div className="navigation-buttons">
       
      <IonButton className="nav-button" fill="clear" onClick={prevPage} disabled={currentPage === 0}>
        <IonIcon icon={chevronBackOutline} />
      </IonButton>
      <IonButton className="nav-button" fill="clear" onClick={nextPage} disabled={currentPage === totalPages - 1} >
        <IonIcon icon={chevronForwardOutline} />
      </IonButton>
      </div>
    </div>
    <div className="scrollable-cards-container2">
          {rerestaurants_near_me.map((rerestaurants_nearme, index) => (
            <IonCard key={index} className="scrollable-card2" onClick={handleClick}  button>
              <img
                style={{
                  height: '147px',
                  width:'311px', // Adjust height
                  marginRight:'auto',
                  margin: '5 140px', // Space between logo and menu button
               
                }}
                src={rerestaurants_nearme.image}
                alt={rerestaurants_nearme.distance}
              />
              <IonCardContent>
              <h2><strong>{rerestaurants_nearme.name}</strong></h2>
                <p> <IonIcon icon={star} /> {rerestaurants_nearme.rating} . {rerestaurants_nearme.distance} {rerestaurants_nearme.time}</p>
                <p>{rerestaurants_nearme.type}</p>
                <p>{rerestaurants_nearme.shortloc}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
<br></br>
<br/>

*/}

<h2>Top restaurant chains in {location}</h2> 
        <div className="pagination-container">       
       <div className="navigation-buttons">
       
      <IonButton className="nav-button" fill="clear" onClick={prevPage} disabled={currentPage === 0}>
        <IonIcon icon={chevronBackOutline} />
      </IonButton>
      <IonButton className="nav-button" fill="clear" onClick={nextPage} disabled={currentPage === totalPages_rerestaurants - 1} >
        <IonIcon icon={chevronForwardOutline} />
      </IonButton>
      </div>
    </div>

        <div className="scrollable-cards-container2">
          {currentrerestaurants.map((rerestaurants, index) => (
            <IonCard key={index} className="scrollable-card2" onClick={handleClick}  button>
              <img
                style={{
                  height: '200px',
                  width:'327px', // Adjust height
                  marginRight:'auto',
                  margin: '5 140px', // Space between logo and menu button
               
                }}
                src={rerestaurants.image}
                alt={rerestaurants.name}
              />
              <IonCardContent>
              <h2><strong>{rerestaurants.name}</strong></h2>
                <p> <IonIcon icon={star} /> {rerestaurants.rating}  <b> {rerestaurants.time}</b> </p>
                <p>{rerestaurants.type}</p>
                <p>{rerestaurants.shortloc}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </div>

<br></br>
<br/>


<h2>Fastest near you</h2> 
<div className="pagination-container">       
       <div className="navigation-buttons">
      
      <IonButton className="nav-button" fill="clear" onClick={prevPage} disabled={currentPage === 0}>
        <IonIcon icon={chevronBackOutline} />
      </IonButton>
      <IonButton className="nav-button" fill="clear" onClick={nextPage} disabled={currentPage === totalPages_rerestaurants - 1} >
        <IonIcon icon={chevronForwardOutline} />
      </IonButton>
      </div>
    </div>
    <div className="scrollable-cards-container2">
          {rerestaurants_near_me.map((rerestaurants_nearme, index) => (
            <IonCard key={index} className="scrollable-card2" onClick={handleClick}  button>
              <img
                style={{
                  height: '147px',
                  width:'311px', // Adjust height
                  marginRight:'auto',
                  margin: '5 140px', // Space between logo and menu button
               
                }}
                src={rerestaurants_nearme.image}
                alt={rerestaurants_nearme.distance}
              />
              <IonCardContent>
              <h2><strong>{rerestaurants_nearme.name}</strong></h2>
                <p> <IonIcon icon={star} /> {rerestaurants_nearme.rating} . {rerestaurants_nearme.distance} {rerestaurants_nearme.time}</p>
                <p>{rerestaurants_nearme.type}</p>
                <p>{rerestaurants_nearme.shortloc}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
<br></br>
<br/>


        <h3>Offers for You </h3> 
        <div className="pagination-container">
       <div className="navigation-buttons">
     
      <IonButton className="nav-button" fill="clear" onClick={prevPage} disabled={currentPage === 0}>
        <IonIcon icon={chevronBackOutline} />
      </IonButton>
      <IonButton className="nav-button" fill="clear" onClick={nextPage} disabled={currentPage === totalPages_rerestaurants - 1} >
        <IonIcon icon={chevronForwardOutline} />
      </IonButton>
      </div>
    </div>
        <div className="scrollable-cards-container">
          {onlycurrentOffers.map((food, index) => (
            <IonCard key={index} className="scrollable-card">
              <img
                style={{
                  height: '167px', // Adjust height
                  width:'200px',
                  margin: '0 0px', // Space between logo and menu button
                }}
                src={food.image}
                alt={food.title}
              />
              <IonCardContent>
                <h2><strong> {food.title}</strong></h2>
                <p>{food.offer}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
        <Footertag/>

        
      </IonContent>

    </IonPage>
  );
};

export default Tab1;
