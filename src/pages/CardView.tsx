import { IonContent,IonCardContent,IonCard,IonButton,IonIcon, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './CardView.css';
import Header from '../components/Header'
import Footertag from '../components/Footer'
import { chevronForwardOutline, chevronBackOutline ,star,chevronDown,pricetag} from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { setName, checkName, removeName } from '../components/utils/preferencesUtil'; 



const CardView: React.FC = () => {

  const [menuname, setMenuName] = useState<string | null>(null);
  const [menu_description, setMenudescription] = useState<string | null>(null);
  const ITEMS_PER_PAGE = 8;

  const Trending_rerestaurants = [
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


  const getName = async () => {
    const fetchedName = await checkName('type_card');
    setMenuName(fetchedName);
  };

  const [currentPage, setCurrentPage] = useState(0);
  
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const rerestaurants = Trending_rerestaurants.slice(startIndex, endIndex);
  const totalPages = Math.ceil(Trending_rerestaurants.length / ITEMS_PER_PAGE);
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    getName();
  }, []);
  

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClick = () => {
    // console.log('Card clicked:', rerestaurants.name);
     //history.push(`/restaurant/${rerestaurants.id}`); // Navigate to restaurant details page
   };

  return (
    <IonPage>
       <Header />
      <IonContent fullscreen>
      <div className="ion-padding">
                <div className="trending-header">
                  
                    <h1> {menuname}</h1>
                    
                    {/* <span role="img" aria-label="fire">🔥</span>  */}
                </div>
                <p>{menu_description}</p>
                </div>


<h2> Top {menuname} Restaurant</h2> 
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
          {Trending_rerestaurants.map((rerestaurants, index) => (
            <IonCard key={index} className="scrollable-card2" onClick={handleClick}  button>
              <img
                style={{
                  height: '147px',
                  width:'311px', // Adjust height
                  marginRight:'auto',
                  margin: '5 140px', // Space between logo and menu button
               
                }}
                src={rerestaurants.image}
                alt={rerestaurants.distance}
              />
              <IonCardContent>
              <h2><strong>{rerestaurants.name}</strong></h2>
                <p> <IonIcon icon={star} /> {rerestaurants.rating} . {rerestaurants.distance} {rerestaurants.time}</p>
                <p>{rerestaurants.type}</p>
                <p>{rerestaurants.shortloc}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
<br></br>
<br/>
<Footertag/>
      </IonContent>
    </IonPage>
  );
};

export default CardView;
