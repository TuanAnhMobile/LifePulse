import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const StepHistory = () => {
  const [completedGoals, setCompletedGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUserId(user.uid);
    }

    const fetchCompletedGoals = async () => {
      try {
        const user = auth().currentUser;
        const querySnapshot = await firestore()
          .collection('steps')
          .where('userId', '==', user.uid)
          .get();

        const goals = querySnapshot.docs.map(doc => doc.data());
        setCompletedGoals(goals);
      } catch (error) {
        console.error('Error fetching completed goals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedGoals();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7C56DC" />
      </View>
    );
  }

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Date: {item.date}</Text>
      <Text style={styles.itemText}>Steps: {item.steps}</Text>
      <Text style={styles.itemText}>Goal: {item.goal}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={completedGoals}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7D9A9',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: '#7C56DC',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  itemText: {
    color: 'white',
    fontSize: 16,
  },
});

export default StepHistory;
