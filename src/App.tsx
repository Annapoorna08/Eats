import { Redirect, Route } from 'react-router-dom';
import { useStatus,StatusProvider } from './components/context/StatusContext';

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home /Home';

import AddToCartPage from './pages/Add To Cart/AddToCartPage';
import AutocompleteSearch from './components/helpers/AutocompleteSearch';
import CardView from './pages/Topbar/CardView';
import CustomerPage from './pages/CustomerPage'
import Makeorder from './pages/Make order/Makeorder'
import ProfileCard from './pages/UserProfie/ProfileCard'


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';




setupIonicReact();

const App: React.FC = () => {

  return (
  <IonApp>
    <IonReactRouter>
  
   
        <IonRouterOutlet>

        <Route exact path="/Makeorder">
         <Makeorder />
        </Route> 

          
                  
          <Route exact path="/AddToCartPage">
            <AddToCartPage />
          </Route>     

          <Route exact path="/Trending">
            <CardView />
          </Route>  
          <Route exact path="/AutocompleteSearch">
          <AutocompleteSearch />
          </Route>

          <Route exact path="/ProfileCard">
          <ProfileCard />
          </Route>



          

          <Route exact path="/CustomerPage">
          <CustomerPage />
          </Route>
      
      
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/CardView">
            <CardView />
          </Route>

          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
 );
};

const WrappedApp: React.FC = () => (
  <StatusProvider>
    <App />
  </StatusProvider>
);

export default WrappedApp;
