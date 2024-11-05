import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const ListItem = ({title, artist, img, url, navigation}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          marginVertical: 5,
          marginHorizontal: 20,
          shadowColor: '#7C56DC',
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 2,
          right: 10,
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Music', {title, artist, img, url})
          }>
          <Image
            source={{uri: img}}
            style={{
              objectFit: 'contain',
              width: 50,
              height: 50,
              borderRadius: 5,
            }}
          />
        </TouchableOpacity>
        <View style={{margin: 5}}>
          <Text style={{color: 'white'}}>{title}</Text>
          <Text style={{color: 'white'}}>{artist}</Text>
        </View>
      </View>
    </View>
  );
};

const Meditation = () => {
  const navigation = useNavigation();
  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('music')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMusicData(data);
      });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Main');
        }}>
        <Image
          source={require('../../icon/back.png')}
          style={{marginLeft: 20, marginTop: 20, tintColor: 'white'}}
        />
      </TouchableOpacity>
      <FlatList
        data={musicData}
        renderItem={({item}) => (
          <ListItem
            img={item.img}
            title={item.title}
            artist={item.artist}
            url={item.url}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Meditation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242B34',
  },
});
