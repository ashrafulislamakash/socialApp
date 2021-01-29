import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext, AuthProvider} from './providers/AuthProvider';
import * as firebase from 'firebase';
import 'firebase/firestore';
import AuthStack from './navigation/AuthStack';
import AppDrawer from './navigation/AppDrawer';

const firebaseConfig = {
  apiKey: 'AIzaSyDA0AWU3MMkEGIcbAkfjDJxBVSz_7fh0DI',
  authDomain: 'blog-6e4ba.firebaseapp.com',
  projectId: 'blog-6e4ba',
  storageBucket: 'blog-6e4ba.appspot.com',
  messagingSenderId: '673071849683',
  appId: '1:673071849683:web:6d1b9fd445a86e80423426',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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
