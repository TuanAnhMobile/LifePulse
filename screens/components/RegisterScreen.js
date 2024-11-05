import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CheckBox from '@react-native-community/checkbox';

const RegisterScreen = ({navigation}) => {
  //xử lí chức năng
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUser, setIsUser] = useState(true); // Xác định vai trò người dùng hoặc chuyên gia

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    try {
      const userCreate = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCreate.user;
      await user.updateProfile({displayName: name});

      //luu vao firestore
      await firestore()
        .collection('user')
        .doc(user.uid)
        .set({
          name: name,
          email: email,
          role: isUser ? 'user' : 'expert', // Gán vai trò dựa trên checkbox
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Đăng kí', 'Đăng kí thành công');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Đăng kí', 'Đăng kí thất bại');
      console.log('That bai that roi :', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{}}>
        <Image
          source={require('../../image/back_3.png')}
          style={{width: 400, height: 410, bottom: 100}}
        />
        <Image
          source={require('../../image/logo3.png')}
          style={{
            width: 280,
            height: 280,
            position: 'absolute',
            top: 20,
            alignSelf: 'center',
          }}
        />
      </View>

      <View style={styles.form}>
        <View style={styles.magin}>
          <Image
            source={require('../../image/name.png')}
            style={styles.icon_1}
          />
          <TextInput
            placeholder="Name"
            style={styles.textinput}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.magin}>
          <Image
            source={require('../../image/email.png')}
            style={styles.icon_3}
          />
          <TextInput
            placeholder="Emaill"
            style={styles.textinput}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.magin}>
          <Image
            source={require('../../image/password.png')}
            style={styles.icon_2}
          />
          <TextInput
            placeholder="Password"
            style={styles.textinput}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isUser}
            onValueChange={setIsUser}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>Tôi là người dùng</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={!isUser}
            onValueChange={() => setIsUser(!isUser)}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>Tôi là chuyên gia</Text>
        </View>

        <View
          style={{flexDirection: 'row', justifyContent: 'center', bottom: 20}}>
          <Text style={{textAlign: 'center'}}>
            You already have an account ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#0F26F9', marginLeft: 10}}>Login</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={{alignSelf: 'center'}}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37386E',
    justifyContent: 'center',
  },
  form: {
    borderRadius: 30,
    backgroundColor: '#55547A',
    margin: 10,
    padding: 20,
    height: 380,
    bottom: 70,
    width: 360,
    alignSelf: 'center',
  },
  textinput: {
    backgroundColor: '#181A26',
    borderRadius: 15,
    paddingLeft: 45,
  },
  magin: {
    margin: 15,
  },
  icon_1: {
    width: 26,
    height: 25,
    position: 'absolute',
    zIndex: 1000,
    top: 12,
    marginLeft: 15,
  },
  icon_2: {
    width: 19.5,
    height: 20,
    position: 'absolute',
    zIndex: 1000,
    top: 16,
    marginLeft: 15,
  },
  icon_3: {
    width: 26,
    height: 20,
    position: 'absolute',
    zIndex: 1000,
    top: 16,
    marginLeft: 15,
  },
  button: {
    backgroundColor: '#5854C2',
    borderRadius: 15,
    padding: 10,
    top: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    bottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    color: 'white',
  },
});
