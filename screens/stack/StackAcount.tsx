import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../components/WelcomeScreen';
import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';
import EditGratitude from '../components/EditGratitude';
import BodyScreen from '../body/BodyScreen';
import BodyBMI from '../body/BodyBMI';
import Meditation from '../healthy/Meditation';
import Music from '../healthy/Music';
import Yoga from '../healthy/Yoga';
import VideoDetail from '../healthy/Videodetail';
import Gratitude from '../components/Gratitude';
import UserMain from '../message/UserMain';
import ExpertMain from '../message/ExpertMain';
import UserQuestions from '../message/UserQuestions';
import User from '../profile/User';
import Information from '../profile/Information';
import ForgetPass from '../components/ForgetPass';
import StepHistory from '../components/StepHistory';
const StackAcount = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
        <Stack.Screen
          name="EditGratitude"
          component={EditGratitude}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Body" component={BodyScreen}></Stack.Screen>
        <Stack.Screen name="BodyBMI" component={BodyBMI}></Stack.Screen>
        <Stack.Screen name="Meditation" component={Meditation}></Stack.Screen>
        <Stack.Screen name="Music" component={Music}></Stack.Screen>
        <Stack.Screen name="Yoga" component={Yoga}></Stack.Screen>
        <Stack.Screen name="Detail" component={VideoDetail}></Stack.Screen>
        <Stack.Screen
          name="Gratitude"
          component={Gratitude}
          options={{headerShown: false}}
        />
        <Stack.Screen name="UserMain" component={UserMain}></Stack.Screen>
        <Stack.Screen name="ExpertMain" component={ExpertMain}></Stack.Screen>
        <Stack.Screen
          name="UserQuestions"
          component={UserQuestions}></Stack.Screen>
        <Stack.Screen name="User" component={User}></Stack.Screen>
        <Stack.Screen name="Information" component={Information}></Stack.Screen>
        <Stack.Screen name="ForgetPass" component={ForgetPass}></Stack.Screen>
        <Stack.Screen name="StepHistory" component={StepHistory}></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default StackAcount;

const styles = StyleSheet.create({});
