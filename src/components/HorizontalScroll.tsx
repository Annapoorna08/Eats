import React from 'react';
import { IonContent, IonIcon, IonItem, IonLabel } from '@ionic/react';
import './HorizontalScroll.css'; // Import the CSS
import { useHistory } from 'react-router-dom';
import { setName, checkName, removeName } from '../components/utils/preferencesUtil'; 


const categories = [
  { name: 'Trending', image: 'assets/Food_Categories/Trending.jpg',title:'' },
  { name: 'Breakfast', image: 'assets/Food_Categories/Breakfast.jpg',title:'' },
  { name: 'Fast Food', image: 'assets/Food_Categories/fastfood.jpg',title:'' },
  { name: 'Pizza', image: 'assets/Food_Categories/pizza.jpeg',title:'Pizza' },
  { name: 'Coffee', image: 'assets/Food_Categories/Coffee.jpg',title:'' },
  { name: 'Chinese', image: 'assets/Food_Categories/Chinese.jpg',title:'' },
  { name: 'Chicken', image: 'assets/Food_Categories/pizza.jpeg',title:'' },
  { name: 'Desserts', image: 'assets/Food_Categories/Desserts.jpeg',title:''},
  { name: 'Smoothies', image: 'assets/Food_Categories/Smoothie.jpeg',title:'' },
  { name: 'Burgers', image: 'assets/Food_Categories/Burger.jpeg',title:'' },
  { name: 'Mexican', image: 'assets/Food_Categories/Mexican.jpg',title:'' },
  { name: 'Soup', image: 'assets/Food_Categories/Soup.jpg',title:'' },
  { name: '1', image: 'assets/Food_Categories/pizza.jpeg',title:'' },
  { name: '2', image: 'assets/Food_Categories/pizza.jpeg',title:'' },
  { name: '3', image: 'assets/Food_Categories/pizza.jpeg',title:'' },
  { name: '4', image: 'assets/Food_Categories/pizza.jpeg',title:'' },
  { name: '5', image: 'assets/Food_Categories/pizza.jpeg',title:'' },
  { name: '6', image: 'assets/Food_Categories/pizza.jpeg',title:'' },

];

const HorizontalScroll: React.FC = () => {
  const history2 = useHistory();
  
  const handleNavigation2 = (link: string,categories_name: string) => {
    saveName(categories_name);
    history2.push(link); // Adjust the path according to your routing setup
  };

  const saveName = async (categories_name: string) => {
    await setName('type_card',categories_name);
  };
  
  return (
 
    <div className="horizontal-scroll">
    {categories.map((category, index) => (
                <a href="#" style={{ textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); handleNavigation2('/CardView',category.name); }}>
        <IonItem key={index} className="horizontal-item " lines="none">
            <div className="icon-label-container">
                <img
                style={{
                  height: '44px', // Adjust height
                  width:'34px',
                  margin: '0 0px', // Space between logo and menu button
                }}
                src={category.image}
                alt={category.title}
              />
                <IonLabel>{category.name}</IonLabel>
                
            </div>
           
        </IonItem>
        </a>
         
    ))}
</div>

  );
};

export default HorizontalScroll;
