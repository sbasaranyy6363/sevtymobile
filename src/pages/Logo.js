import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';

import logo from '../../images/logo.png';

export default class Logo extends React.Component {
  render(){
  return (
    
           <View style={styles.container}>
             <Image source={logo}
             resizeMode={'contain'}
             style={{width:150, height:150}}/>
             

           </View>
        
  );
 }
}

const styles = StyleSheet.create({

  logoContainer : {
    
  },
});