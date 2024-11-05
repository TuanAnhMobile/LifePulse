import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth'; // Import Firebase Authentication
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';

const UserMain = ({navigation}) => {
  const [question, setQuestion] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [topics] = useState([
    {label: 'Tâm lý học', value: 'Tâm lý học'},
    {label: 'Stress và lo âu', value: 'Stress'},
    {label: 'Hôn nhân và gia đình', value: 'Gia đình'},
    {label: 'Sức khoẻ tâm thần', value: 'Sức khoẻ'},
    {label: 'Khác', value: 'Khác'},
  ]);

  const submitQuestion = async () => {
    const user = auth().currentUser; // Lấy thông tin người dùng hiện tại
    if (user) {
      const userId = user.uid; // UID của người dùng hiện tại
      await firestore().collection('consultations').add({
        userId,
        topic: selectedTopic,
        question,
        answer: '',
        status: 'pending',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      setQuestion('');
      setSelectedTopic('');

      Alert.alert('Gửi thành công');
    } else {
      console.error('Người dùng chưa đăng nhập');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#7C56DC',
          paddingVertical: 17,
          paddingHorizontal: 20,
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Image
            style={styles.goBackButton}
            source={require('../../icon/back.png')}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 10,
          }}>
          Hãy nói vấn đề của bạn{' '}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#A890FE',
          padding: 12,
          margin: 20,
          borderRadius: 20,
        }}>
        <Picker
          selectedValue={selectedTopic}
          style={styles.picker}
          onValueChange={itemValue => setSelectedTopic(itemValue)}>
          <Picker.Item label="Chọn chủ đề tư vấn" value="" />
          {topics.map(topic => (
            <Picker.Item
              key={topic.value}
              label={topic.label}
              value={topic.value}
            />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('UserQuestions')}
        style={{
          padding: 10,
          width: 200,
          borderRadius: 30,
          marginLeft: 20,
        }}>
        <Text style={{color: 'black'}}>Xem câu hỏi của tôi</Text>
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: '#EA8D8D',
          height: 400,
          margin: 20,
          borderRadius: 20,
        }}>
        <TextInput
          style={styles.input}
          placeholder="Bạn cần tư vấn về vấn đề gì..."
          placeholderTextColor={'black'}
          value={question}
          onChangeText={setQuestion}
          multiline
        />
        <TouchableOpacity
          onPress={submitQuestion}
          disabled={!question || !selectedTopic}>
          <Image
            source={require('../../image/send.png')}
            style={{
              width: 40,
              height: 40,
              objectFit: 'contain',
              marginTop: 10,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDCCDD',
  },
  input: {
    height: 200,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    margin: 20,
    color: 'black',
    backgroundColor: 'white',
  },
  picker: {
    height: 80,
    width: '100%',
    marginBottom: 10,
  },
});
