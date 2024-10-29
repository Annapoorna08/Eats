declare module 'google' {
    export = google;
  }
  
  declare global {
    interface Window {
      google: any;
    }
  }
  