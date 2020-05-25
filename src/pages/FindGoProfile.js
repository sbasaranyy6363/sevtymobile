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
  Image,
  AsyncStorage,
  Switch,
  FlatList,
} from 'react-native';

import { Container, Header, Content, List, ListItem,  } from 'native-base';

import Geolocation from '@react-native-community/geolocation';
import Logo from '../pages/Logo';
import ImagePicker from 'react-native-image-picker';

const { width: WIDTH } = Dimensions.get('window');



export default class Profile extends React.Component {


// static navigationOptions = {
  //  title: 'SelectActivity',
 // }

constructor(props) {
   super(props);
    //this.login= this.login.bind(this);

  
    this.registerCall = this.registerCall.bind(this);
    var {height, width} = Dimensions.get('window');
    this.state = {screenHeight: height, screenWidth: width,
                 username: '',
                 token:'',
                 name:'',
                 gender:'',
                 photo: null,  
                 lastname:'',
                 date:'',
                 location:'',
                 lswitchValue: false ,
                 nswitchValue: false ,
                 status: '',
                 wholeResult: '',
           baseUrl: 'https://sevty-user-service.herokuapp.com/profile' };

       this._getToken();
     //  this.getProfile();

   }



_getToken = async () => {
  let token = '';
  try {
    token = await AsyncStorage.getItem('token') || 'none' ;
    this.setState({token:token})
  } catch (error) {
    // Error retrieving data
   Alert.alert(error.message);
  }
  return token;
}


onClickListener = (viewId) => {
      
             this.registerCall();
          
 }

getProfile(){
   var that = this;
   const {navigate} = this.props.navigation;
   var url = that.state.baseUrl;
   console.log("url:"+url);

  
   fetch(url,{
         method: 'GET',
           headers: {
             'Accept' : 'application/json',
             'Content-Type': 'application/json',
             'Authorization':this.state.token,

           },
         }).then(function (response) {
           return response.json();
         }).then(function (result) { 
           // console.log(result);
           if(result.status !== 200){
            that.setState({ status: result.error,
                            wholeResult: result,
                         });
          Alert.alert("hata");

            console.log(that.state.wholeResult);
        }else{ 
           that.setState({  name: result.firstname ,
                            lastname: result.lastname,
                            username:result.username,
                            gender:result.gender,
                            date:result.birthDate,
                            lswitchValue:result.preferences.useMyLocation,
                            nswitchValue:result.preferences.sentNotificationToMe

                         });
        
        console.log(result);
   }
}).catch(function (error) {
   console.log("-------- error ------- "+error);
   alert("result:"+error)
 });
}


registerCall(){
   var that = this;
   const {navigate} = this.props.navigation;
   var url = that.state.baseUrl;
   console.log("url:"+url);

  
   fetch(url,{
         method: 'PUT',
           headers: {
             'Accept' : 'application/json',
             'Content-Type': 'application/json',
             'Authorization':this.state.token,

           },
         body: JSON.stringify({
            "firstname": this.state.name,
            "gender":this.state.gender,
            "lastname": this.state.lastname,
            "birthDate": parseInt(this.state.date),
            "location":this.state.location,
            "image":this.state.photo,
            "usemylocation":this.state.lswitchValue,
            "sentnotificationtome": this.state.nswitchValue })

         }).then(function (response) {
           return response.json();
         }).then(function (result) { 
           // console.log(result);
           if(result.status !== 200){
            that.setState({ status: result.error,
                            wholeResult: result,
                         });
          Alert.alert("hata");

            console.log(that.state.wholeResult);
        }else{ 
        navigate('Select');
        console.log(result);
   }
}).catch(function (error) {
   console.log("-------- error ------- "+error);
   alert("result:"+error)
 });
}

locationSwitch = value => {
    //onValueChange of the switch this function will be called
    this.setState({ lswitchValue: value });

      Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.setState({location:initialPosition});
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    //state changes according to switch
    //which will result in re-render the text
  }

notificationSwitch = value => {
    //onValueChange of the switch this function will be called
    this.setState({ nswitchValue: value });

    //state changes according to switch
    //which will result in re-render the text
  }

handleChoosePhoto = () => {
  const options ={
    noData:true
  };
  ImagePicker.launchImageLibrary(options,response=>{
    console.log("response",response);
    if(response.uri){
      this.setState({photo:response});

    }
  });
};


render() {
 
  const {gender, photo}=this.state;
  
  return (
   

   <View style={styles.container}>
  
    <Text style={styles.input}>Profile</Text>


    {photo && 
               (
      <Image 
        source={{uri:photo.uri}}
        style={{  alignSelf: 'center',
    height: 130,
    width: 130,
    marginBottom:10,
    borderWidth: 1,
    borderRadius: 75}}
        />
    )}





  
<View style={styles.cheksone}> 

<TouchableOpacity style={styles.submitButtonTextPhoto} title="Choose Photo" onPress={this.handleChoosePhoto} >
            
               <Text style={{width:130 ,  height:20 ,textAlign:'center'}}>Click to Add Photo</Text>
    </TouchableOpacity>
</View>
  
<View style={styles.chekstwo}> 
    <Text style={styles.texttwo}>Location Active</Text>
    <Switch trackColor={{true:  'rgba(0, 190, 255, 1)', false: 'grey'}}
          onValueChange={this.locationSwitch}
          value={this.state.lswitchValue}
        />

   <Text style={styles.texttwo}>Notifcation Active</Text>   
        <Switch trackColor={{true:  'rgba(0, 190, 255, 1)', false: 'grey'}}
          
          onValueChange={this.notificationSwitch}
          value={this.state.nswitchValue}
        />
</View>





   <TouchableOpacity style={styles.submitButtonText}
     onPress={() => this.onClickListener('sign_up')}
   >
     <Text style={styles.signUpText}>Next</Text>
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
      marginBottom :80,
      
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
   height:20,
 },
 submitButtonText:{
   color: '#FFFFFF',
   backgroundColor: 'rgba(0, 190, 255, 1)',
   width:100,
   height:35,
   borderRadius:30,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop:60,
   borderColor:'black',

 },
 submitButtonTextPhoto:{

   color: '#FFFFFF',
   backgroundColor: 'white',
   width:130,
   height:35,
   borderRadius:30,
   justifyContent: 'center',
   alignItems: 'center',
   borderColor:'gray',
   borderWidth:0.5,
 },
 submitButtonTextTwo:{
   color: '#FFFFFF',
   backgroundColor: 'white',
   width:30,
   height:30,
   borderRadius:30,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop:0,
   marginBottom:10,
 },

 signUpText:{
   color: '#FFFFFF',
   alignItems: 'center',

 },

signUpTextTwo:{
  color: 'black',
   justifyContent: 'flex-start',
},


 cheks:{ 
   flexDirection:'row',
   borderRadius:50,
   marginBottom:15,
   marginTop:15,
   borderWidth:2,
   height:40,
   borderColor: 'rgb(180, 180, 180)',
   justifyContent: 'space-between' 
 },
 cheksone:{
  flexDirection:'row',
   borderRadius:0,
   marginBottom:10,
   borderWidth:0,
   marginTop:20,
   borderColor: 'rgb(180, 180, 180)',
   justifyContent: 'space-between' 

 },
  chekstwo:{ 
   flexDirection:'row',
   borderRadius:0,
   marginBottom:10,
   borderWidth:0,
   marginTop:20,
   borderColor: 'rgb(180, 180, 180)',
   justifyContent: 'space-between' 
 },
 inputContainer: {
   borderBottomColor: 'gray',
   backgroundColor:'rgba(0, 0, 255, 0.1)',
   borderRadius:10,
   borderBottomWidth: 1.5,
   borderWidth:1,
   width:250,
   height:30,
   marginTop:5,
   marginBottom:10,
   flexDirection: 'row',
   alignItems:'center'
 },
  inputContainertwo: {
   borderBottomColor: 'gray',
   backgroundColor:'rgba(0, 0, 255, 0.1)',
   borderRadius:10,
   borderBottomWidth: 1.5,
   textAlign:'center',
   borderWidth:1,
   width:50,
   height:40,
   marginTop:10,
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
  button:{
       borderRadius:50,
       width:25,
       height:45,
       flex:1,
       padding:14,
       alignContent:'center'
  },
  active:{
       backgroundColor:'rgba(0, 0, 255, 0.1)',
       color:'rgba(0, 0, 255, 1)',
       height:35,
  },
  text:{
    marginTop:-7,
    color:'#2F4F4F',
    textAlign:'center'
  },
    texttwo:{
    marginLeft:5,
    marginTop:2,
    color:'#2F4F4F',
    textAlign:'center'
  },
  textone:{
     marginBottom:5,
    color:'#2F4F4F',
    textAlign:'center'
  },
  textInput:{

  }
})