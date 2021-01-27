import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {Card, Button, Input} from 'react-native-elements';
import HeaderMenu from '../components/HeaderMenu';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNetInfo} from '@react-native-community/netinfo';
import PostCard from '../components/PostCard';
import {AuthContext} from '../providers/AuthProvider';
import * as firebase from 'firebase';
import 'firebase/firestore';

const Home = (props) => {
  const netinfo = useNetInfo();
  if (netinfo.type != 'unknown' && !netinfo.isInternetReachable) {
    alert('No Internet!');
  }
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const loadPosts = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection('posts')
      .orderBy('created_at', 'desc')
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(temp_posts);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  useEffect(() => {
    loadPosts();
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
              onChangeText={(currentText) => {
                setInput(currentText);
              }}
            />
            <Button
              title="Post"
              type="outline"
              onPress={function () {
                setLoading(true);
                firebase
                  .firestore()
                  .collection('posts')
                  .add({
                    userId: auth.CurrentUser.uid,
                    body: input,
                    author: auth.CurrentUser.displayName,
                    created_at: firebase.firestore.Timestamp.now(),
                    likes: [],
                    comments: [],
                  })
                  .then(() => {
                    setLoading(false);
                    alert('Post created Successfully!');
                  })
                  .catch((error) => {
                    setLoading(false);
                    alert(error);
                  });
              }}
            />
          </Card>
          <ActivityIndicator size="large" color="red" animating={loading} />

          <FlatList
            data={posts}
            renderItem={({item}) => {
              return (
                <PostCard
                  author={item.data.author}
                  title={item.id}
                  body={item.data.body}
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
