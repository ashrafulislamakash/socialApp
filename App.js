import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext, AuthProvider} from './providers/AuthProvider';
// import * as firebase from 'firebase';

import AuthStack from './navigation/AuthStack';
import AppDrawer from './navigation/AppDrawer';

// const firebaseConfig = {
//   apiKey: 'AIzaSyANhkXmAjE5pYY8Qlqxgfv32AkyWcM78lo',
//   authDomain: 'social-5d561.firebaseapp.com',
//   databaseURL: 'https://social-5d561-default-rtdb.firebaseio.com',
//   projectId: 'social-5d561',
//   storageBucket: 'social-5d561.appspot.com',
//   messagingSenderId: '64452222990',
//   appId: '1:64452222990:web:6a6ab1a47947dfabee1c5f',
//   measurementId: 'G-3JHDMHKSQK',
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

const App = (props) => {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <AppDrawer /> : <AuthStack />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};

export default App;
