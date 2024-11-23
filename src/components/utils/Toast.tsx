import React from 'react';
import { IonToast } from '@ionic/react';

// Define props for the Toast component
interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  duration?: number;
  position?: 'top' | 'bottom' | 'middle';
}

const Toast: React.FC<ToastProps> = ({
  isOpen,
  onClose,
  message,
  duration = 2000,
  position = 'bottom'
}) => {
  return (
    <IonToast
      isOpen={isOpen}
      onDidDismiss={onClose}
      message={message}
      duration={duration}
      position={position}
    />
  );
};

export default Toast;
