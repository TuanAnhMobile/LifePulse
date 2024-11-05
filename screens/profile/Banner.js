import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Banner = () => {
  const [userData, setUserData] = useState({
    height: '',
    weight: '',
    gender: '',
    name: '', // Add name to userData state
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

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
      <View style={styles.profileContainer}>
        <Image
          source={require('../../image/img_tuananh.jpg')}
          style={styles.img}
        />
        <Text style={styles.nameText}>{userData.name || 'N/A'}</Text>
        {/* Display user's name */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', bottom: 30}}>
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
      </View>

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
              placeholder="Tên"
              value={userData.name}
              onChangeText={text => setUserData({...userData, name: text})}
            />
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

export default Banner;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    bottom: 20,
  },
  headerText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
  },
  img: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 40,
  },
  nameText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 16,
    flex: 1,
  },
  editButton: {
    backgroundColor: '#66BDD1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
    fontSize: 15,
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
  form: {
    width: 95,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
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
    padding: 30,
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
