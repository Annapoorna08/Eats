import { Redirect, Route } from 'react-router-dom';
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
import Tab1 from './pages/Tab1';
import Tab3 from './pages/Tab3';
import AddToCartPage from './pages/AddToCartPage';
import AutocompleteSearch from './components/helpers/AutocompleteSearch';
import CardView from './pages/CardView';
import CustomerPage from './pages/CustomerPage'
import MenuPage from './pages/MenuPage'
import Register from './pages/Register';

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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
  
   
        <IonRouterOutlet>

        <Route exact path="/MenuPage">
            <MenuPage />
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



          <Route exact path="/Register">
          <Register />
          </Route>

          <Route exact path="/CustomerPage">
          <CustomerPage />
          </Route>
      
      
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/CardView">
            <CardView />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
       

    </IonReactRouter>
  </IonApp>
);

export default App;
