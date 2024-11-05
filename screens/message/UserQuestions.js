import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      const unsubscribe = firestore()
        .collection('consultations')
        .where('userId', '==', user.uid)
        .onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
          setQuestions(data);
        });

      return () => unsubscribe();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Câu trả lờI:</Text>
      <FlatList
        data={questions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.questionContainer}>
            <Text style={styles.topic}>Chủ đề: {item.topic}</Text>
            <Text style={styles.question}>Câu hỏi: {item.question}</Text>
            {item.answer ? (
              <Text style={styles.answer}>Câu trả lời: {item.answer}</Text>
            ) : (
              <Text style={styles.pending}>Đang chờ trả lời...</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default UserQuestions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DDCCDD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#7C56DC',
  },
  questionContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
  },
  topic: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#7C56DC',
  },
  question: {
    fontSize: 16,
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    color: 'green',
  },
  pending: {
    fontSize: 16,
    color: 'red',
  },
});
