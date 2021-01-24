import 'react-native-gesture-handler';
import * as React from 'react';
import {StyleSheet, StatusBar, Button, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

const App = () => {
  const setData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      alert('Data Saved Successfully');
    } catch (error) {
      alert(error);
    }
  };

  const setDataJSON = async (key, value) => {
    try {
      value = JSON.stringify(value);
      await AsyncStorage.setItem(key, value);
      console.log('Data Saved Successfully');
    } catch (error) {
      alert(error);
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value != null) {
        alert(value);
      } else {
        alert('No data assigned to this key');
      }
    } catch (error) {
      alert(error);
    }
  };

  const getDataJSON = async (key) => {
    try {
      let data = await AsyncStorage.getItem(key);
      if (data != null) {
        data = JSON.parse(data);
        console.log(data);
      } else {
        alert('No data assigned to this key');
      }
    } catch (error) {
      alert(error);
    }
  };

  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log('Data Removed Successfully');
    } catch (error) {
      alert(error);
    }
  };
  return (
    <LinearGradient style={styles.container} colors={['#8E24AA', '#311B92']}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />

      <View style={styles.btn}>
        <Button
          title="Save Data"
          onPress={function () {
            setDataJSON('CorseInfo', {
              ID: '2722',
              program: 'CSE',
              CourseName: 'Web And Mobile App DEv',
            });
          }}
        />
        <Button
          title="Read Data"
          onPress={function () {
            getDataJSON('CorseInfo');
          }}
        />
        <Button
          title="Remove Data"
          onPress={function () {
            removeData('CorseInfo');
          }}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
