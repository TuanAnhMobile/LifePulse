import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ExpertMain = ({navigation}) => {
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('consultations')
      .where('status', '==', 'pending')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setConsultations(data);
      });

    return () => unsubscribe();
  }, []);

  const submitAnswer = async () => {
    if (selectedConsultation) {
      await firestore()
        .collection('consultations')
        .doc(selectedConsultation.id)
        .update({
          answer,
          status: 'answered',
        });
      setAnswer('');
      setSelectedConsultation(null);
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
          Trả lời câu hỏi tư vấn
        </Text>
      </View>
      <View>
        <Text
          style={{color: 'black', marginLeft: 20, fontSize: 20, marginTop: 10}}>
          Yêu cầu tư vấn :
        </Text>
      </View>
      <FlatList
        data={consultations}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.consultation}
            onPress={() => setSelectedConsultation(item)}>
            <Text style={{fontSize: 20}}>{item.question}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedConsultation && (
        <View style={styles.answerSection}>
          <TextInput
            style={styles.input}
            placeholder="Nhập câu trả lời của bạn"
            placeholderTextColor={'gray'}
            value={answer}
            onChangeText={setAnswer}
          />
          <TouchableOpacity onPress={submitAnswer}>
            <Image
              source={require('../../image/send.png')}
              style={{
                width: 40,
                height: 40,
                objectFit: 'contain',
                marginTop: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ExpertMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDCCDD',
  },
  consultation: {
    backgroundColor: '#EA8D8D',
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 20,
    fontSize: 20,
  },
  answerSection: {
    flexDirection: 'row',
  },
  input: {
    width: 320,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 20,
    color: 'black',
  },
});
