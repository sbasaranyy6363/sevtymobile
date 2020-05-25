import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  AppRegistry,
  TouchableOpacity,
  Image
} from 'react-native';


import Logo from '../pages/Logo';

import search from '../../images/search.png';
import add from '../../images/add.png';



export default class SelectActivity extends Component<{}> {
  render(){
  return (
    
          

<View style={{ justifyContent:'flex-start', flex:1,flexDirection: 'column'}}>
 
 
        <View style={{ height: 370, width: 400, justifyContent:'center',    alignItems: 'center',backgroundColor: 'white' }} >
 
               <TouchableOpacity style={styles.submitButtonText}
              onPress={()=>this.props.navigation.navigate('Create')}>
             
             <Image source={add}
             resizeMode={'contain'}
             style={{width:300, height:300  }}/>

           </TouchableOpacity>
  
             
        </View>
 
 
        <View style={{ width:400, height: 2, justifyContent:'center',   alignItems: 'center', backgroundColor:'gray'}} >
        </View>
 
 <View style={{ height: 370, width: 400, justifyContent:'center',    alignItems: 'center',}} >
        <TouchableOpacity style={styles.submitButtonText}
              onPress={()=>this.props.navigation.navigate('Find')}>
       <Image source={search}
             resizeMode={'contain'}
             style={{width:300, height:300 }}/>
             
           </TouchableOpacity>
     </View>   
 
 
</View>
           
        
  );
 }
};

const styles = StyleSheet.create({
 container: {
   
  }, 
 submitButtonText:{
   color: '#FFFFFF',
   backgroundColor: 'white',
   width:250,
   height:100,
   borderRadius:10,
   justifyContent: 'center',
   alignItems: 'center',
    marginTop:10,
 },
 signUpText:{
   color: '#FFFFFF',
   alignItems: 'center'
 },

});



