import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {Card, Button, Input} from 'react-native-elements';
import HeaderMenu from '../components/HeaderMenu';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNetInfo} from '@react-native-community/netinfo';
import PostCard from '../components/PostCard';
import {AuthContext} from '../providers/AuthProvider';
import {getPosts} from './../requests/Posts';
import {getUsers} from './../requests/Users';

const Home = (props) => {
  const netinfo = useNetInfo();
  if (netinfo.type != 'unknown' && netinfo.isInternetReachable) {
    alert('No Internet!');
  }
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    const response = await getPosts();
    if (response.ok) {
      setPosts(response.data);
    } else {
      alert(response.problem);
    }
  };

  const loadUsers = async () => {
    const response = await getUsers();
    if (response.ok) {
      setUsers(response.data);
    } else {
      alert(response.problem);
    }
    setLoading(false);
  };

  const getName = (id) => {
    let name = '';
    users.forEach((element) => {
      if (element.id == id) {
        name = element.name;
      }
    });
    return name;
  };
  useEffect(() => {
    loadPosts();
    loadUsers();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderMenu
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <Card>
            <Input
              placeholder="What's On Your Mind?"
              leftIcon={<Entypo name="pencil" size={24} color="black" />}
            />
            <Button title="Post" type="outline" onPress={function () {}} />
          </Card>
          <ActivityIndicator size="large" color="red" animating={loading} />

          <FlatList
            data={posts}
            renderItem={({item}) => {
              return (
                <PostCard
                  userId={getName(item.userId)}
                  title={item.title}
                  body={item.body}
                />
              );
            }}
          />
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: 'blue',
  },
  viewStyle: {
    flex: 1,
  },
});

export default Home;
