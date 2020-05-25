import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView
} from 'react-native';

import Router from './src/Router';


export default class App extends React.Component {
  render(){
  return (
    
           <View style={styles.container}>

             <Router/>            
           
           </View>
        
  );
 }
}

const styles = StyleSheet.create({

  container : {
    backgroundColor:'white',
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }

});
 