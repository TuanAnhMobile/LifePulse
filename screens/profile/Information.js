import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Button,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Information = () => {
  const [userData, setUserData] = useState({
    height: '',
    weight: '',
    gender: '',
  });
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = auth().currentUser.uid;
        const userDoc = await firestore().collection('user').doc(uid).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const uid = auth().currentUser.uid;
      await firestore().collection('user').doc(uid).set(userData);
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating user data: ', error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {/* <Image
            source={require('../../image/profile.png')}
            style={styles.img}
          /> */}
        </TouchableOpacity>
      </View>

      {/* <View style={{flexDirection: 'row'}}>
        <View style={styles.form}>
          <Text style={styles.textValue}>{userData.height || 'N/A'}</Text>
          <Text style={styles.textLabel}>Chiều cao</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.textValue}>{userData.weight || 'N/A'}</Text>
          <Text style={styles.textLabel}>Cân nặng</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.textValue}>{userData.gender || 'N/A'}</Text>
          <Text style={styles.textLabel}>Giới tính</Text>
        </View>
      </View> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                bottom: 20,
                left: 20,
              }}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  source={require('../../icon/ic_x.png')}
                  style={{width: 20, height: 20, objectFit: 'contain'}}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Chiều cao"
              value={userData.height}
              onChangeText={text => setUserData({...userData, height: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Cân nặng"
              value={userData.weight}
              onChangeText={text => setUserData({...userData, weight: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Giới tính"
              value={userData.gender}
              onChangeText={text => setUserData({...userData, gender: text})}
            />
            <Button title="Lưu" onPress={handleSave} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
  },
  img: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  form: {
    width: 95,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textValue: {
    color: '#9DCEFF',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
  },
  textLabel: {
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'red',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: 200,
    paddingLeft: 8,
    color: 'black',
    borderRadius: 20,
  },
});

export default Information;
