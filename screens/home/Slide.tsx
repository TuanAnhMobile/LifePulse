import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Slide = () => {
  return (
    <LinearGradient
      colors={['#8E2DE2', '#4A00E0']} // Màu gradient từ tím nhạt đến tím đậm
      start={{x: 0, y: 0}} // Bắt đầu từ bên trái
      end={{x: 1, y: 0}}
      style={styles.gradient}>
      <View style={styles.textContainer}>
        <Text style={styles.quoteText}>"Never stop learning because life</Text>
        <Text style={styles.quoteText}>never stops teaching "</Text>
      </View>
      <View style={styles.authorContainer}>
        <Text style={styles.authorText}>-Tuan Anh</Text>
      </View>
    </LinearGradient>
  );
};

export default Slide;

const styles = StyleSheet.create({
  gradient: {
    height: 200,
    borderRadius: 30,
    margin: 20,
  },
  textContainer: {
    margin: 20,
  },
  quoteText: {
    fontSize: 20,
    color: 'white',
  },
  authorContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    margin: 10,
    top: 50,
  },
  authorText: {
    fontSize: 20,
    color: 'white',
  },
});
