import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Gratitude = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(null);

  //lay id cua ng dung hien tai
  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUserId(user.uid);
    } else {
      Alert.alert('Error', 'User is not authenticated');
    }
  }, []);

  //them bai viet
  const handleAddGratitude = async () => {
    try {
      await firestore().collection('gratitudes').add({
        userId: userId,
        title: title,
        content: content,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Thành công', 'Nội dung của bạn đã được thêm!');
      // Xóa nội dung sau khi thêm
      setTitle('');
      setContent('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add gratitude');
      console.error('Error adding document: ', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#DDCCDD'}}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Main');
          }}>
          <Image
            source={require('../../icon/back.png')}
            style={{marginLeft: 20, marginTop: 20}}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#7C56DC',
            textAlign: 'center',
            marginTop: 20,
            marginLeft: 10,
          }}>
          Ngày hôm nay bạn thế nào ?
        </Text>
      </View>
      <View style={{margin: 10}}>
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={handleAddGratitude}>
          <Image
            source={require('../../icon/ic_true.png')}
            style={{objectFit: 'contain', width: 40, height: 40}}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 2,
          backgroundColor: '#37386E',
          margin: 10,
          borderRadius: 30,
        }}>
        <TextInput
          placeholder="Nhâp tiêu đề..."
          placeholderTextColor={'white'}
          value={title}
          onChangeText={setTitle}
          style={{
            borderBottomWidth: 1,
            borderColor: 'white',
            margin: 10,
            color: 'white',
          }}
        />
        <TextInput
          placeholder="Bạn muốn viết điều gì...."
          placeholderTextColor={'white'}
          value={content}
          onChangeText={setContent}
          style={{margin: 10, color: 'white'}}
        />
      </View>
    </View>
  );
};

export default Gratitude;

const styles = StyleSheet.create({});
