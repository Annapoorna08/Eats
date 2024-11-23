import React, { useState, useEffect } from 'react';
import {
  IonCard,
  IonCardContent,
  IonInput,
  IonIcon,
  IonList,
  IonGrid,
  IonCol,
  IonRow,
  IonToggle,
  IonButton,
  IonSearchbar
} from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { MenuItem } from '../../components/Model/Menumodel';
import vegIcon from '/assets/vegIcon.png'; // Path to Veg icon
import nonVegIcon from '/assets/nonVegIcon.png'; // Path to Non-Veg icon
import './MenuIteam.css'

interface RestaurantPageProps {
  menumodel: MenuItem[]; // Accept MenuItem
}

const MenuIteam: React.FC<RestaurantPageProps> = ({ menumodel }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [isnonVeg, setIsnonVeg] = useState(false);
  const [isVeg, setIsVeg] = useState(false);
  const [isBestseller, setIsBestseller] = useState(false);

  const handleToggleChange = (type: string) => {
    // Custom functionality for toggle if needed
  };

  const handleButtonClick = () => {
    setIsBestseller(!isBestseller); // Toggle the Bestseller state
  };

  useEffect(() => {
    // Initialize menu with menumodel on component mount
    if (menumodel && menumodel.length > 0) {
      setMenu(menumodel);
    }
  }, [menumodel]);

  const filteredMenu = menu.filter((item) =>
    item.iteamName.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by name
    item.iteamDescription.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by description
    item.iteamType.toLowerCase().includes(searchQuery.toLowerCase()) // Search by VEG
  );

  return (
    <>
      <div className="toggle-container"> 
        {/* Optional Toggle UI */}
      </div>

      <IonRow className="search-row">
        <IonToggle
          checked={isVeg}
          onIonChange={(e) => {
            setIsVeg(e.detail.checked); // First function
            handleToggleChange(); // Second function
          }}
          className="custom-toggle-veg"
        />
        <IonToggle checked={isnonVeg} onIonChange={e => {setIsnonVeg(e.detail.checked); handleToggleChange();}} className="toggle-nonveg"/>
        <IonButton className={`bestseller-button ${isBestseller ? 'active' : ''}`} onClick={handleButtonClick} >Bestseller</IonButton>

        <IonCol size="12">
          <IonSearchbar placeholder="Search for dishes" onIonChange={(e) => setSearchQuery(e.detail.value!)} />
        </IonCol>
      </IonRow>

      {/* Check if menu is empty */}
      {menu.length === 0 ? (
        <div className="empty-menu">
          <p>No items available in the menu.</p>
        </div>
      ) : (
        <IonList>
          <IonGrid className="menu-grid">
            {filteredMenu.map((item) => (
              <IonCol key={item.id} size="12" size-md="4">
                <IonCard className="menu-card">
                  <IonCardContent>
                    <div className="flex-parent-element">
                      <div className="flex-child-element magenta">
                        {/* Veg/Non-Veg Icon */}
                        {item.iteamType === 'Veg' ? (
                          <img src={vegIcon} alt="Veg" className="type-icon" />
                        ) : (
                          <img src={nonVegIcon} alt="Non-Veg" className="type-icon" />
                        )}

                        {/* Item Details */}
                        <h2>{item.iteamName}</h2>
                        <p className="menu-description">{item.iteamDescription}</p>
                        <p className="price">₹{item.itemPrice}</p>
                      </div>

                      <div className="flex-child-element green">
                        {/* Image Box */}
                        {item.itemImage ? (
                          <div className="image-box">
                            <img
                              src={item.itemImage}
                              alt={item.iteamName}
                              className="menu-image"
                            />
                          </div>
                        ) : (
                          <p>No image available</p>
                        )}
                      </div>
                    </div>
                    {/* Button Below Image */}
                    <IonButton expand="full" color="primary" className="menu-item-button">
                      Order Now
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonGrid>
        </IonList>
      )}
    </>
  );
};

export default MenuIteam;
