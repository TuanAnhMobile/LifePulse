import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header'
import Slide from './Slide'
import Activity from './Activity'

const HomeScreen = () => {
  return (
    <View style={{flex:1,backgroundColor:'#DDCCDD'}}>
      <Header/>
      <Slide/>
      <Activity/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})