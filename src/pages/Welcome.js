import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';


import Logo from '../pages/Logo';

export default class Welcome extends Component<{}> {
  render(){
  return (
    
            <View style={styles.container}>
           <Logo/>
             <TouchableOpacity style={styles.submitButtonText}
             onPress={()=>this.props.navigation.navigate('Login')}>
             <Text style={styles.signUpText}>Login</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.submitButtonText}
              onPress={()=>this.props.navigation.navigate('SignIn')}>
             <Text style={styles.signUpText}>SıgnUp</Text>
             </TouchableOpacity>
           </View>
        
  );
 }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
  },
  submitButton: {
   backgroundColor: '#7a42f4',
   padding: 10,
   margin: 15,
   height: 60,

 },
 submitButtonText:{
   color: '#FFFFFF',
   backgroundColor: 'rgba(0, 190, 255, 1)',
   width:250,
   height:45,
   borderRadius:10,
   justifyContent: 'center',
   alignItems: 'center',
    marginTop:10,
 },
 signUpText:{
   color: '#FFFFFF',
   alignItems: 'center'
 },
 inputs:{
   height:45,
   marginLeft:16,
   borderBottomColor: '#FFFFFF',
   flex:1,
  },
})