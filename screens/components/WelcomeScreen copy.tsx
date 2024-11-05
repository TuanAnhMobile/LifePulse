import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({navigation}:any) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../image/back_1.png')} style={styles.topImage} />
      </View>
      <View style={{margin:10}}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.welcomeText}>Personal development</Text>
      </View>
      <Image source={require('../../image/logo1.png')} style={styles.logo} />
      <View>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
        <Image source={require('../../image/intro_button.png')}
       style={{ width: 113, height: 112,bottom:150,alignSelf:'flex-end'}}
       />
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#37386E', 
    justifyContent: 'space-between',
  },
  logo:{
    width: '80%', height: 330, alignSelf: 'center',bottom:490
  },
  imageContainer: {
    alignItems: 'center',
  },
  topImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },

  welcomeText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FBB03B', // màu vàng của nút
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
});
