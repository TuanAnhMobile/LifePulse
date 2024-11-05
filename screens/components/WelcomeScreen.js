import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';

const WelcomeScreen = ({navigation}) => {
  const handleDone = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        pages={[
          {
            backgroundColor: '#37386E',
            image: (
              <View style={styles.lottieContainer}>
                <LottieView
                  style={styles.lottie}
                  source={require('../../animations/skip_3.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Chào mừng bạn đến với LifePulse',
            subtitle:
              'Bắt đầu hành trình mới để khám phá tiềm năng của bạn và cải thiện cuộc sống hàng ngày.',
          },
          {
            backgroundColor: 'salmon',
            image: (
              <View style={styles.lottieContainer}>
                <LottieView
                  style={styles.lottie}
                  source={require('../../animations/skip_2.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Khám phá các tính năng độc đáo',
            subtitle:
              'Các công cụ và tài nguyên để hỗ trợ bạn trong hành trình phát triển bản thân',
          },
          {
            backgroundColor: '#37386E',
            image: (
              <View style={styles.lottieContainer}>
                <LottieView
                  style={styles.lottie}
                  source={require('../../animations/skip_3.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Bắt đầu hành trình của bạn',
            subtitle: 'Đừng chần chừ nữa, hãy bắt đầu ngay hôm nay!',
          },
        ]}
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    // Đặt màu nền cho LottieView
    flex: 1,
  },
  lottieContainer: {
    width: 300,
    height: 400,
    // Đặt màu nền cho LottieView
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 350,
    height: 400,
  },
});
