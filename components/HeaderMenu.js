import React from 'react';
import {Header} from 'react-native-elements';
import {AuthContext} from '../providers/AuthProvider';
const HeaderMenu = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: props.DrawerFunction,
          }}
          // centerComponent={{text: 'The Office', style: {color: '#fff'}}}
          // rightComponent={{
          //   icon: 'lock-outline',
          //   color: '#fff',
          // }}
        />
      )}
    </AuthContext.Consumer>
  );
};

export default HeaderMenu;
