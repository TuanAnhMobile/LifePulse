import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
      const user = auth().currentUser;

      if (user) {
        const userDoc = await firestore()
          .collection('user')
          .doc(user.uid)
          .get();
        if (userDoc.exists) {
          const data = userDoc.data();
          setLoading(false);

          if (!data.profileCompleted) {
            navigation.navigate('Body');
          } else {
            navigation.navigate('Main');
          }
        } else {
          await firestore().collection('user').doc(user.uid).set({
            role: 'user', // Vai trò mặc định
            profileCompleted: false,
          });
          setLoading(false);
          navigation.navigate('Body');
        }
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Đăng nhập', 'Đăng nhập thất bại');
      console.log('Lỗi:', error);
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../image/back_3.png')}
          style={{width: 400, height: 410, bottom: 100}}
        />
        <LottieView
          style={styles.lottie}
          source={require('../../animations/skip_2.json')}
          autoPlay
          loop
        />
      </View>

      <View style={styles.form}>
        <View style={styles.magin}>
          <Image
            source={require('../../image/email.png')}
            style={styles.icon_1}
          />
          <TextInput
            placeholder="Email"
            style={styles.textinput}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={'white'}
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
            placeholderTextColor={'white'}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')}>
          <Text style={{color: 'white', marginLeft: 10, textAlign: 'center'}}>
            Quên mật khẩu ?
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('../../image/facebook.png')}
            style={styles.img}
          />
          <Image
            source={require('../../image/google.png')}
            style={styles.img}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#0F26F9', marginLeft: 10}}>Đăng kí</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{alignSelf: 'center'}}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  lottie: {
    width: 280,
    height: 280,
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
  },
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
    color: 'white',
  },
  magin: {
    margin: 15,
  },
  icon_1: {
    width: 26,
    height: 20,
    position: 'absolute',
    zIndex: 1000,
    top: 16,
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
  button: {
    backgroundColor: '#5854C2',
    borderRadius: 15,
    padding: 10,
    top: 20,
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    margin: 15,
  },
});
