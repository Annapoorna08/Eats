import { Capacitor } from '@capacitor/core';
import { isPlatform } from '@ionic/react';

/**
 * Helper function to check the platform using Capacitor
 * Returns 'ios', 'android', or 'web' as a string.
 */
export const getPlatform = (): 'ios' | 'android' | 'web' => {
  // Use Capacitor's getPlatform to return the platform
  return Capacitor.getPlatform() as 'ios' | 'android' | 'web'; 
};

/**
 * Helper function to check if running on iOS
 */
export const isIOS = (): boolean => {
  return isPlatform('ios');
};

/**
 * Helper function to check if running on Android
 */
export const isAndroid = (): boolean => {
  return isPlatform('android');
};

/**
 * Helper function to check if running on Web (browser)
 */
export const isWeb = (): boolean => {
  return isPlatform('desktop') || isPlatform('mobileweb');
};
