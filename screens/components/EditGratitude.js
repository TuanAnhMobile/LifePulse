import {
  Alert,
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

const EditGratitude = ({route, navigation}) => {
  const {item} = route.params;

  const [title, setTitle] = useState(item.title); //nhận dữ liệu
  const [content, setContent] = useState(item.content);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUserId(user.uid);
    } else {
      Alert.alert('Error', 'User is not authenticated');
    }
  }, []);

  const handleUpdateGratitude = async () => {
    try {
      await firestore().collection('gratitudes').doc(item.id).update({
        title: title,
        content: content,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Thành công', 'Bạn đã sửa nội dung thành công!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update gratitude');
      console.error('Error updating document: ', error);
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
            fontSize: 30,
            fontWeight: 'bold',
            color: '#7C56DC',
            textAlign: 'center',
            marginTop: 10,
            marginLeft: 10,
          }}>
          Chỉnh sửa
        </Text>
      </View>
      <View style={{margin: 10, bottom: 20}}>
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={handleUpdateGratitude}>
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
          bottom: 20,
        }}>
        <TextInput
          placeholder="Enter title..."
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
          placeholder="Enter content..."
          placeholderTextColor={'white'}
          value={content}
          onChangeText={setContent}
          style={{margin: 10, color: 'white'}}
          multiline
        />
      </View>
    </View>
  );
};

export default EditGratitude;

const styles = StyleSheet.create({});
