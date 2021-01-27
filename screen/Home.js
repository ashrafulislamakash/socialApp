import React, {useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
  View,
  Text,
  Button,
} from 'react-native';
import {AuthContext} from '../providers/AuthProvider';

import HeaderMenu from '../components/HeaderMenu';

import BG from '../assets/BG.png';

const Home = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <ImageBackground source={BG} style={styles.image}>
          <HeaderMenu
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="transparent"
            translucent={true}
          />

          <Text style={[styles.text, {color: 'red'}]}> Welcome to </Text>
          <Text style={styles.text}> {auth.CurrentUser.name} !</Text>
          {/* <View style={styles.card}>
          <LinearGradient
            colors={['#5851DB', '#C13584', '#E1306C', '#FD1D1D', '#F77737']}
            style={styles.card}></LinearGradient>
        </View> */}

          <Button
            title="Log Out"
            onPress={function () {
              auth.setIsLoggedIn(false);
              auth.setCurrentUser({});
            }}
          />
        </ImageBackground>
      )}
    </AuthContext.Consumer>
  );
};

export default Home;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
  },

  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    padding: 10,
  },
  card: {
    flex: 1,
    width: 300,
    height: 500,
    maxWidth: '80%',
    maxHeight: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
