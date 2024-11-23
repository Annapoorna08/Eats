// src/components/OfferModal.tsx
import React from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react';
import './OfferModal.css'; // Make sure to import your CSS file

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerDetails: {
    title: string;
    badge: string;
    timer: string;
    description: string; // Add more fields as needed
  } | null;
}

const OfferModal: React.FC<OfferModalProps> = ({ isOpen, onClose, offerDetails }) => {
  if (!offerDetails) return null;

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{offerDetails.title}</IonTitle>
          <button className="close-button" onClick={onClose}>
            &times; {/* This is the close 'X' character */}
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <h3>{offerDetails.badge}</h3>
          <p>{offerDetails.timer}</p>
          <p>{offerDetails.description}</p>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default OfferModal;
