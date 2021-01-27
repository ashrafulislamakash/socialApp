import React from 'react';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Card, Button, Avatar, Text} from 'react-native-elements';

const PostCard = (props) => {
  return (
    <Card>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Avatar
          containerStyle={{backgroundColor: '#ffab91'}}
          rounded
          icon={{name: 'user', type: 'font-awesome', color: 'black'}}
          activeOpacity={1}
        />
        <Text h4Style={{padding: 10}} h4>
          {props.userId}
        </Text>
      </View>
      <Text style={{fontStyle: 'italic'}}> {props.title}</Text>
      <Text
        style={{
          paddingVertical: 10,
        }}>
        {props.body}
      </Text>

      <Card.Divider />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          type="outline"
          title="  Like (17)"
          icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
        />
        <Button type="solid" title="Comment (10)" />
      </View>
    </Card>
  );
};

export default PostCard;
