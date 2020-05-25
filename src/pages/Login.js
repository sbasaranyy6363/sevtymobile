import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  AsyncStorage
} from 'react-native';

const { width: WIDTH } = Dimensions.get('window');

import Logo from '../pages/Logo';




export default class Login extends React.Component {


 static navigationOptions = {
    title: 'Profile',
  }



constructor(props) {
   super(props);
    //this.login= this.login.bind(this);
    this.registerCall = this.registerCall.bind(this);
    var {height, width} = Dimensions.get('window');
    this.state = {screenHeight: height, screenWidth: width,
                 username: '',
                 email : '',
                 password: '',
                 status: '',
                 wholeResult: '',
                 baseUrl: 'https://sevty-user-service.herokuapp.com/login' };

   }

onClickListener = (viewId) => {
        // Alert.alert(this.state.Usrname+" "+this.state.email+" "+this.state.password , "View_id "+viewId);
        if(this.state.username || this.state.username != " "){
          if(this.state.password)
          {
              this.registerCall();
          }
          else
          {
          Alert.alert("Please enter Username and Password");
          }
          
          }
      else
      {
    Alert.alert("Please enter password");
      }
 }

registerCall(){
   var that = this;
   const {navigate} = this.props.navigation;
   var url = that.state.baseUrl;
    console.log("url:"+url);

   fetch(url,{
         method: 'POST',
           headers: {
             'Accept' : 'application/json',
             'Content-Type': 'application/json',
           },
         body: JSON.stringify({"username": this.state.username,"password": this.state.password})
         }).then(function (response) {
           return response.json();
         }).then(function (result) { 
           // console.log(result);
           if(result.status !== 200){
            that.setState({ status: result.error,
                            wholeResult: result,
                         });
         Alert.alert(
      "Wrong username or password",
      "",
      [
        {
          text: "",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Try Again", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
            console.log(that.state.wholeResult);
        }else{ 
        AsyncStorage.setItem('token', result.result );
        navigate('Profile');
        console.log(result);
   }
}).catch(function (error) {
   console.log("-------- error ------- "+error);
   alert("result:"+error)
 });
}

render() {
  return (
   

   <View style={styles.container}>
    <Logo/>

   <Text style={styles.input}>Login</Text>

   <View style={styles.inputContainer}>

 
   <TextInput style={styles.inputs}
    placeholder="Username"
    keyboardType="default"
    underlineColorAndroid='transparent'
    onChangeText={(username) => this.setState({username})}/>
   </View>


   <View style={styles.inputContainer}>

     <TextInput style={styles.inputs}
      placeholder="Password"
      secureTextEntry={true}
      underlineColorAndroid='transparent'
      onChangeText={(password) => this.setState({password})}/>

   </View>

   <TouchableOpacity style={styles.submitButtonText}
    onPress={() => this.onClickListener('sign_up')}
   >
     <Text style={styles.signUpText}>Login</Text>
   </TouchableOpacity>


            <TouchableOpacity style={styles.submitButtonText}
              onPress={()=>this.props.navigation.navigate('Create')}>
             <Text style={styles.signUpText}>Back</Text>
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
  input: {
   margin: 15,
   fontSize: 25,
   marginBottom :30,
   marginTop :0,
   color : 'rgba(0, 190, 255, 1)',
  },
  submitButton: {
   backgroundColor: '#7a42f4',
   padding: 10,
   margin: 15,
   height: 60,
 },
 submitButtonText:{
   color: '#FFFFFF',
   backgroundColor:'rgba(0, 190, 255, 1)',
   width:150,
   height:45,
   borderRadius:10,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop:10,

 },
 signUpText:{
   color: '#FFFFFF',
   alignItems: 'center',

 },
 inputContainer: {
   borderBottomColor: 'rgba(0, 190, 255, 1)',
   backgroundColor:'rgba(0, 0, 255, 0.1)',
   borderRadius:5,
   borderBottomWidth: 1,
   width:350,
   height:45,
   marginBottom:10,
   flexDirection: 'row',
   alignItems:'center'
 },
 inputs:{
   height:45,
   marginLeft:16,
   borderBottomColor: '#FFFFFF',
   flex:1,
  },
})