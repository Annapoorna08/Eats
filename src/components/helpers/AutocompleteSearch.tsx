import React, { useState, useEffect, useRef } from 'react';
import { IonSearchbar, IonList, IonItem } from '@ionic/react';
import { getCurrentLocation } from './locationService';
import { locationOutline } from 'ionicons/icons';

import { setName, checkName, removeName } from '../utils/preferencesUtil'; 

const AutocompleteSearch: React.FC = () => {
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const inputRef = useRef<HTMLIonSearchbarElement>(null);

  // Initialize Google Autocomplete Service
  useEffect(() => {
    if (window.google) {
      const autoService = new google.maps.places.AutocompleteService();
      const placesServiceInstance = new google.maps.places.PlacesService(document.createElement('div'));
      setAutocompleteService(autoService);
      setPlacesService(placesServiceInstance);
    }
  }, []);

  const saveName = async (location: string) => {
    await setName('location',location);
  };

  // Update predictions based on search input
  const handleSearch = (query: string) => {
    setSearchText(query);
    if (autocompleteService && query.length > 2) {
      autocompleteService.getPlacePredictions({ input: query }, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setPredictions(predictions || []);
        } else {
          setPredictions([]);
        }
      });
    } else {
      setPredictions([]);
    }
  };

  // When a place is selected from the list
  const handlePlaceSelect = (placeId: string ,description: string) => {
    if (placesService) {
      placesService.getDetails({ placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          console.log('Selected place details:', place);
          // Use the place details here (e.g., store lat/lng or address)

          // Check if address_components exists and has at least one component
        const addressComponents = place.address_components;
        const longName = addressComponents && addressComponents.length > 0
          ? addressComponents[0].long_name
          : '';

          saveName(longName);

          setSearchText(`${longName} ${description}`); // Set the search box value to the selected description
          setPredictions([]); // Clear the predictions to close the dropdown
        }
      });
    }
  };

  // Get current location on load and update the search bar with it (optional)
  useEffect(() => {
    (async () => {
      const location = await getCurrentLocation();
      console.log(location);
      if (location) {
        const latLng = new google.maps.LatLng(location.latitude, location.longitude);
        if (inputRef.current) {
          // Casting to HTMLInputElement
          const inputElement = inputRef.current.shadowRoot?.querySelector('input');
          if (inputElement) {
            inputElement.value = 'Using Current Location...'; // Set in the input
          }
        }
      }
    })();
  }, []);

  return (
    <div>
      <IonSearchbar
      searchIcon={locationOutline}
        ref={inputRef}
        debounce={300}
        value={searchText}
        onIonInput={(e) => handleSearch((e.target as unknown as HTMLInputElement).value)}
        placeholder="Search for places"
        className="responsive-searchbar" 
      />

      {predictions.length > 0 && (
        <IonList>
          {predictions.map((prediction, index) => (
            <IonItem
              key={index}
              button
              onClick={() => handlePlaceSelect(prediction.place_id,prediction.description)}
            >
              {prediction.description}
            </IonItem>
          ))}
        </IonList>
      )}
    </div>
  );
};

export default AutocompleteSearch;
