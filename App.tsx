import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WelcomeScreen from './screens/components/WelcomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import StackAcount from './screens/stack/StackAcount';
import HomeScreen from './screens/home/HomeScreen';
import Tabs from './screens/stack/Tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import Gratitude from './screens/components/Gratitude';
import EditGratitude from './screens/components/EditGratitude';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Stack.Navigator>
          <Stack.Screen
            name="StackAcount"
            component={StackAcount}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={Tabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
