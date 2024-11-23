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
import './Home.css';
import Footertag from '../../components/MainComponent/Footer'
import Header from '../../components/MainComponent/Header';
import { chevronForwardOutline, chevronBackOutline ,star,chevronDown,pricetag} from 'ionicons/icons';
import RestaurantPage from '../Common Page/RestaurantPage';
import HorizontalScroll from '../../components/HorizontalScroll';
import { setName, checkName, removeName } from '../../components/utils/preferencesUtil'; 
import {Restaurant} from '../../components/Model/Restaurant' 




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


const ITEMS_PER_PAGE = 3;
const Home: React.FC = () => {
  const user_location='Kannur';
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(0);
  const [top_restaurants, setTop_restaurants] = useState<Restaurant[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    fetchData();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

 
  const seeall = () => {
  
  };
 

  const fetchData = async () => {
    try {
       // Prepare the request payload in JSON format
       const requestData = {
        restaurantCity:user_location 
      };

      const response = await fetch(`http://localhost:8080/res/getRestaurant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Setting content type to JSON
        },
        body: JSON.stringify(requestData), // Convert the object to a JSON string
      });
      if (response.ok) {
        const result = await response.json(); // Assuming the response is in JSON format
        setTop_restaurants(result)
      } else {
        console.error('Failed to load restaurant document');
      }
    } catch (error) {
      console.error('Error fetching restaurant Doc API:', error);
    }
   
  };


  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;



  interface Restaurants {
    name: string;
    rating: string;
    distance: string;
    time: string;
    type: string;
    shortloc: string;
    image: string;
  }


  const restaurants_near_me: Restaurants[] = [
    {
      name: "Lake Ayah Restaurant, Kottiyam",
      rating: "3.9 (297 ratings)", // Extracted numeric rating from "4.4 (4.2K+ ratings)"
      distance: "1.5 km", // Adding a hypothetical distance
      time: "25-30 mins",
      type: "Chinese, South Indian",
      shortloc: "Kottiyam",
      image: "/assets/Restaurant/Lake Ayah Restaurant.jpeg",
    },
    {
      name: "Rahath Foods",
      rating: "4.3 (14 ratings)",
      distance: "1.8 km", // Adding a hypothetical distance
      time: "25-30 mins",
      type: "Indian ,Arabian",
      shortloc: "Kottiyam",
      image: "/assets/Restaurant/Rahath Foods.jpeg",
    },
    {
      name: "Shanghai Bowl",
      rating: "NEW",
      distance: "2.0 km", // Adding a hypothetical distance
      time: "25-30 mins",
      type: "Chinese",
      shortloc: "Kottiyam",
      image: "/assets/Restaurant/Shanghai Bowl.jpeg",
    },
    {
      name: "Thaj Fast Food",
      rating: "4.1 (3.3K+ ratings)",
      distance: "2.5 km", // Adding a hypothetical distance
      time: "20-15 mins",
      type: "South Indian, Chinese",
      shortloc: "Kollam City",
      image: "/assets/Restaurant/Thaj Fast Food.jpeg",
    },
    {
      name: "Hotel Geetham",
      rating: "4.2 (4.1K+ ratings)",
      distance: "3.0 km", // Adding a hypothetical distance
      time: "15-20 mins",
      type: "South Indian",
      shortloc: "Chinnakada",
      image: "/assets/Restaurant/Hotel Geetham.jpeg",
    },
    {
      name: "Falooda Nation",
      rating: "4.4 (2.1K+ ratings)",
      distance: "2.2 km", // Adding a hypothetical distance
      time: "15-20 mins",
      type: "Desserts, Ice Cream",
      shortloc: "Kollam",
      image: "/assets/Restaurant/Falooda Nation.jpeg",
    },
    {
      name: "Javees Cinema Restaurant",
      rating: "4.4 (12K+ ratings)",
      distance: "2.2 km", // Adding a hypothetical distance
      time: "20-25 mins",
      type: "Desserts, Ice Cream",
      shortloc: "Kollam City",
      image: "/assets/Restaurant/Javees Cinema Restaurant.jpeg",
    },
    {
      name: "Thalassery kitchen",
      rating: "4.1 (1.8K+ ratings)",
      distance: "2.2 km", // Adding a hypothetical distance
      time: "25-30 mins",
      type: "South Indian, Snacks",
      shortloc: "RP Mall",
      image: "/assets/Restaurant/Thalassery kitchen.jpeg",
    },
    {
      name: "Baskin Robbins - Ice Cream Desserts",
      rating: "4.6 (1.1K+ ratings)",
      distance: "2.2 km", // Adding a hypothetical distance
      time: "25-30 mins",
      type: "Ice Cream",
      shortloc: "RP Mall",
      image: "/assets/Restaurant/Baskin Robbins - Ice Cream Desserts.jpeg",
    },
    
  ];
  

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
       
       
          
{/*
<RestaurantPage title={"AI Suggestion " + location} restaurants={restaurants_near_me} /> */}
<RestaurantPage title={"Top restaurant chains in " + user_location} restaurants={top_restaurants} />
<RestaurantPage title={"Restaurants with online food delivery in " + user_location} restaurants={restaurants_near_me} />


       
        <Footertag/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
