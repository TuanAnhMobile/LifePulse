import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Banner from './Banner';
import Information from './Information';
import Content from './Content';

const ProfileScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Banner />
      <Information />
      <Content />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
