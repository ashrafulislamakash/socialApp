import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../providers/AuthProvider';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Loading from '../components/Loading';

const SignIn = (props) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <LinearGradient
            style={styles.container}
            colors={['#8E24AA', '#311B92']}>
            <SafeAreaView style={styles.container}>
              <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor="transparent"
                translucent={true}
              />
              <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
              </View>

              <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <View style={styles.action}>
                  {/* <MaterialCommunityIcons name="user-o" color="#fff" size={20} /> */}

                  <TextInput
                    placeholder="E-mail"
                    onChangeText={function (currentInput) {
                      setEmail(currentInput);
                    }}
                    placeholderTextColor="#fff"
                    style={[styles.textInput, {color: '#fff'}]}
                  />
                </View>

                <Animatable.View
                  animation="fadeInLeft"
                  duration={500}></Animatable.View>

                <View style={styles.action}>
                  {/* <MaterialCommunityIcons name="lock" color="#fff" size={20} /> */}
                  <TextInput
                    placeholder="Password"
                    onChangeText={function (currentInput) {
                      setPassword(currentInput);
                    }}
                    placeholderTextColor="#fff"
                    secureTextEntry={true}
                    style={[styles.textInput, {color: '#fff'}]}
                  />
                </View>

                <Animatable.View
                  animation="fadeInLeft"
                  duration={500}></Animatable.View>

                <TouchableOpacity>
                  <Text style={{color: '#fff', marginTop: 10}}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>

                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {
                      setIsLoading(true);
                      firebase
                        .auth()
                        .signInWithEmailAndPassword(Email, Password)
                        .then((userCreds) => {
                          setIsLoading(false);
                          auth.setIsLoggedIn(true);
                          auth.setCurrentUser(userCreds.user);
                        })
                        .catch((error) => {
                          setIsLoading(false);
                          alert(error);
                        });
                    }}>
                    <LinearGradient
                      colors={['#8E24AA', '#311B92']}
                      style={styles.signIn}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Sign In
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('SignUp')}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#fff',
                        marginTop: 10,
                      }}>
                      Don't have an account?
                      <Text
                        style={{
                          color: '#55ACEE',
                          paddingLeft: 10,
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Sign Up
                      </Text>
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      margin: 10,
                    }}>
                    <View
                      style={{flex: 1, height: 1, backgroundColor: '#fff'}}
                    />
                    <View>
                      <Text
                        style={{width: 50, textAlign: 'center', color: '#fff'}}>
                        Or
                      </Text>
                    </View>
                    <View
                      style={{flex: 1, height: 1, backgroundColor: '#fff'}}
                    />
                  </View>

                  <TouchableOpacity>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#fff',
                        marginTop: 10,
                      }}>
                      Sign In with Social Networks
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.iconViewStyle}>
                  <TouchableOpacity
                    style={[styles.icon, {backgroundColor: '#164CBD'}]}>
                    {/* <MaterialCommunityIcons name="facebook" color="#fff" size={25} /> */}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.icon, {backgroundColor: '#55ACEE'}]}>
                    {/* <MaterialCommunityIcons name="twitter" color="#fff" size={25} /> */}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.icon, {backgroundColor: '#DD4B39'}]}>
                    {/* <MaterialCommunityIcons name="google" color="#fff" size={25} /> */}
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </SafeAreaView>
          </LinearGradient>
        )}
      </AuthContext.Consumer>
    );
  }
};
export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 36,
  },

  action: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#fff',
  },

  button: {
    alignItems: 'center',
    marginTop: 10,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  iconViewStyle: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },

  icon: {
    width: 40,
    height: 40,
    margin: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
