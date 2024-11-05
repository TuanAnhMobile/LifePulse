import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    id: '1',
    title: 'Hoạt động tinh thần',
    animation: require('../../animations/skip_3.json'), // Thay thế bằng đường dẫn đến file Lottie JSON
    screen: 'Gratitude',
  },
  {
    id: '2',
    title: 'Body',
    animation: require('../../animations/body.json'), // Thay thế bằng đường dẫn đến file Lottie JSON
    screen: 'BodyBMI',
  },
  {
    id: '3',
    title: 'Thiền Định',
    animation: require('../../animations/skip_2.json'), // Thay thế bằng đường dẫn đến file Lottie JSON
    screen: 'Music',
  },
  {
    id: '4',
    title: 'Yoga',
    animation: require('../../animations/yoga.json'), // Thay thế bằng đường dẫn đến file Lottie JSON
    screen: 'Yoga',
  },
];

const ListItem = ({title, screen, animation, navigation}: any) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(screen)}>
        <LottieView source={animation} autoPlay loop style={styles.animation} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const Activity = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.username}>Hoạt động</Text>
      <FlatList
        data={data}
        horizontal={true}
        renderItem={({item}) => (
          <ListItem
            title={item.title}
            animation={item.animation}
            screen={item.screen}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    color: '#7C56DC',
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    shadowColor: '#7C56DC',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 10,
    height: 250,
    width: 250,
  },
  animation: {
    width: 200,
    height: 200,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Activity;
