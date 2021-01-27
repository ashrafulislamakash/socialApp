import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {Card, Button, Input} from 'react-native-elements';
import PostCard from '../components/PostCard';
import HeaderMenu from '../components/HeaderMenu';
import Entypo from 'react-native-vector-icons/Entypo';

import {AuthContext} from '../providers/AuthProvider';
import {getPosts} from '../requests/Posts';
import loading from '../components/Loading';

const Home = (props) => {
  const [posts, setPosts] = useState([]);

  const loasPost = async () => {
    const response = await getPosts();
    if (response.ok) {
      setPost(response.data);
    } else {
      alert(response.problem);
    }
  };

  useEffect(() => {
    loasPost();
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
                // firebase
                //   .firestore()
                //   .collection('posts')
                //   .add({
                //     userId: auth.CurrentUser.uid,
                //     body: input,
                //     author: auth.CurrentUser.displayName,
                //     created_at: firebase.firestore.Timestamp.now(),
                //     likes: [],
                //     comments: [],
                //   })
                //   .then(() => {
                //     setLoading(false);
                //     alert('Post created Successfully!');
                //   })
                //   .catch((error) => {
                //     setLoading(false);
                //     alert(error);
                //   });
              }}
            />
          </Card>
          <ActivityIndicator size="large" color="red" animating={loading} />

          <FlatList
            data={posts}
            renderItem={({item}) => {
              return (
                <PostCard
                  author={item.userId}
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
