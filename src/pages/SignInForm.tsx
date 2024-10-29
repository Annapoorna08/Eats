import React, { useState } from 'react';
import { IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';

interface SignInFormProps {
  onDismiss: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onDismiss }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = () => {
    // Implement your sign-in logic here
    console.log('Email:', email);
    console.log('Password:', password);
    onDismiss(); // Close the modal after sign-in
  };

  return (
    <IonCard>
      <IonCardHeader>
        <h2>Welcome Back</h2>
      </IonCardHeader>

      <IonCardContent>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            clearInput
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            clearInput
          />
        </IonItem>

        <IonButton expand="block" onClick={handleSignIn} className="ion-margin-top">
          Sign In
        </IonButton>

        <IonButton color="danger" expand="block" onClick={onDismiss} className="ion-margin-top">
          Cancel
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default SignInForm;
