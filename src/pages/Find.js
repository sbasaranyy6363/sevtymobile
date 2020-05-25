import React, {Component,useState } from 'react';
import {Platform, StyleSheet, Text, Picker, View, TextInput, SafeAreaView, TouchableOpacity, 
  Alert,
  Image,
  Button,AsyncStorage,
  Dimensions} from 'react-native';
import Logo from '../pages/Logo';

import MultiSelect from 'react-native-multiple-select';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import searchtwo from '../../images/searchtwo.png';


  this.items = [{
    id: 'Dance',  
    name: 'Dance',
  }, 
  {
    id: 'Cinema',
    name: 'Cinema',
  }, 
  {
    id: 'Sport',
    name: 'Sport',
  },
  {
    id: 'Lesson',
    name: 'Lesson',
  },
  {
    id: 'Art',
    name: 'Art',
  }, 
  {
    id: 'Drink,Eat',
    name: 'Drink,Eat',
  },
   {
    id: 'Fun',
    name: 'Fun',
  },
   {
    id: 'Walk',
    name: 'Walk',
  }, 
  {
    id: 'Travel',
    name: 'Travel',
  },
  {
    id: 'PC,PS vb',
    name: 'PC,PS vb',
  }, 
  {
    id: 'Gym',
    name: 'Gym',
  }];



export default class CreateAct extends Component{

  constructor(props) {
    super(props);
    this.state = { 
      gender:'',
      items: '',
      baseUrl: 'https://sevty-user-service.herokuapp.com/activities',
      token:'',
      hobbies:[],
      values:[],
      region:'',
      lat:41.015137,
      long:28.979530,
 focusedLocation: {
        latitude: 41.015137,
        longitude: 28.979530,
        latitudeDelta: 0.0122,
        longitudeDelta:
          Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122
      },
      locationChosen: false
    }

     this._getToken();
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
 onRegionChange(region) {
    this.setState({ region });
  }

 onSelectedItemsChange = hobbies => {
    this.setState({ hobbies });
  };

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });

  };

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    },
  err => {
    console.log(err);
    alert("Fetching the Position failed, please pick one manually!");
  })
  }


registerCall(){
   var that = this;
   var url = that.state.baseUrl;
   console.log("url:"+url);
   console.log(JSON.stringify({
          "gender": that.state.gender,
          "ageRange":that.state.values,
          "hobbies": that.state.hobbies,
          "location":{ "lat": that.state.focusedLocation.latitude, "long": that.state.focusedLocation.longitude},
       }))

   fetch(url,{
         method: 'POST',
           headers: {
             'Accept' : 'application/json',
             'Content-Type': 'application/json',
             'Authorization':that.state.token
           },
         body: JSON.stringify({
          "gender": that.state.gender,
          "ageRange":that.state.values,
          "hobbies": that.state.hobbies,
          "location":{ "lat": that.state.focusedLocation.latitude, "long": that.state.focusedLocation.longitude},
       })
         }).then(function (response) {
           return response.json();
         }).then(function (result) {

           // console.log(result);
           if(result.status !== 200){
               
        }else{ 
        that.props.navigation.navigate('FindAfter',{data:result.result})
        console.log(result);
   }
}).catch(function (error) {
   console.log("-------- error ------- "+error);
   alert("result:"+error)
 });
}

 multiSliderValuesChange = (values) => {
        this.setState({
            values,
        });
    }

  render() {

  const { gender, hobbies  }=this.state;
 
    var mapStyle=[{"elementType": "geometry", "stylers": [{"color": "#242f3e"}]},{"elementType": "labels.text.fill","stylers": [{"color": "#746855"}]},{"elementType": "labels.text.stroke","stylers": [{"color": "#242f3e"}]},{"featureType": "administrative.locality","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#263c3f"}]},{"featureType": "poi.park","elementType": "labels.text.fill","stylers": [{"color": "#6b9a76"}]},{"featureType": "road","elementType": "geometry","stylers": [{"color": "#38414e"}]},{"featureType": "road","elementType": "geometry.stroke","stylers": [{"color": "#212a37"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#9ca5b3"}]},{"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#746855"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#1f2835"}]},{"featureType": "road.highway","elementType": "labels.text.fill","stylers": [{"color": "#f3d19c"}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#2f3948"}]},{"featureType": "transit.station","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#17263c"}]},{"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#515c6d"}]},{"featureType": "water","elementType": "labels.text.stroke","stylers": [{"color": "#17263c"}]}];
 let marker = null;
 if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }
    return (

     
      <View>


               <View style={{ height: 100, width: 350, justifyContent:'center',    alignItems: 'center',backgroundColor: 'white',marginBottom:20 }} >              
             <Image source={searchtwo}
             resizeMode={'contain'}
             style={{width:175, height:175 ,  justifyContent:'center', alignItems: 'center'}}/>
                </View>
         
  <Text style={{marginBottom:2,
    marginTop:20,
    color:'black',
    textAlign:'center'}}>Find activities</Text>

        <MultiSelect

          hideTags
          items={items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={hobbies}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={ (text)=> console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
   <Text style={{textAlign:'center',marginTop:10}}> Age : {this.state.values[0]}-{this.state.values[1]}</Text>
  <MultiSlider
                    values={[this.state.values[0], this.state.values[1]]}
                    sliderLength={350}
                    onValuesChange={this.multiSliderValuesChange}
                    min={18}
                    max={65}
                    step={1}
                />
              
               
  <Text style={{marginBottom:2,
    marginTop:20,
    color:'black',
    textAlign:'center'}}>Preferred</Text>
<View style={styles.cheks}>  

   <TouchableOpacity 
             style={[styles.button , gender === 'woman' ? styles.active : null]}
             onPress={() => this.setState({ gender: 'woman' })}
             >
             <Text style={{ marginTop:-5,
    color:'#2F4F4F',
    textAlign:'center'}}>Woman</Text>
             </TouchableOpacity>

   <TouchableOpacity 
         style={[styles.button , gender === 'man' ? styles.active : null]}
             onPress={() => this.setState({gender: 'man'})}
             >
              <Text style={{ marginTop:-5,
    color:'#2F4F4F',
    textAlign:'center'}}>Man</Text>
             </TouchableOpacity>

   <TouchableOpacity 
         style={[styles.button , gender === 'both' ? styles.active : null]}
             onPress={() => this.setState({gender: 'both'})}
             >
             <Text style={{ marginTop:-5,
    color:'#2F4F4F',
    textAlign:'center'}}>Both</Text>
             </TouchableOpacity>
 </View>

      
        

     <MapView
          initialRegion={this.state.focusedLocation}
          region={!this.state.locationChosen ? this.state.focusedLocation : null}
         style={{ flex: 1 }}
          onPress={this.pickLocationHandler}
          ref={ref => this.map = ref}
        >
          {marker}
        </MapView>
     


   <TouchableOpacity style={styles.submitButtonText}
    onPress={() => this.onClickListener('sign_up')}
   >
     <Text style={styles.signUpText}>Find</Text>
   </TouchableOpacity>

      </View>  
     
        
    );
  }
}


const styles = StyleSheet.create({
  containerx: {
   flex: 1,
   justifyContent: 'center',
   marginTop:60,

  },
 inputContainer: {
   borderBottomColor: 'rgba(0, 190, 255, 1)',
   backgroundColor:'rgba(0, 0, 255, 0.05)',
   borderRadius:5,
   borderBottomWidth: 1,
   width:300,
   height:35,
   marginBottom:30,
   marginTop:5,
   flexDirection: 'row',
   alignItems:'center'

 },
 inputs:{
   height:45,
   marginLeft:16,
   borderBottomColor: '#FFFFFF',
   flex:1,
  },

 cheks:{ 
   flexDirection:'row',
   borderRadius:50,
   marginBottom:15,
     marginTop:5,
   borderWidth:2,
   height:40,
   borderColor: 'rgb(180, 180, 180)',
   justifyContent: 'space-between' 
 },
  button:{

       borderRadius:50,
       width:355,
       height:245,
       flex:1,
       padding:14,
       alignContent:'center'
  },
  active:{
       backgroundColor:'rgba(0, 0, 255, 0.1)',
       color:'rgba(0, 0, 255, 1)',
       height:35,
  },  
 
  submitButtonText:{
    color: '#FFFFFF',
   backgroundColor: 'rgba(0, 190, 255, 1)',
   width:150,
   height:45,
   borderRadius:10,
   justifyContent: 'center',
   alignItems: 'center',
   marginLeft:100,
   marginBottom:40,
   marginTop:15,
  
 },
 signUpText:{
   color: '#FFFFFF',
   alignItems: 'center',
 },
    map: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },

});