import React, { Component, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
  Spinner,
  ActivityIndicator,
  TouchableHighlight,
  FlatList,
  ListView,
  Button,
  ScrollView,
  AsyncStorage,
  Dimensions,
} from "react-native";
import searchtwo from '../../images/searchtwo.png';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

export default class FindAfter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:props.navigation.state.params.data,
      isLoading: true,
    };

  }
  

   render() {
    const data = this.state.data;
    return (
      <View style={styles.container}>
        <View style={{ height: 100, width: 380, justifyContent:'center',    alignItems: 'center',backgroundColor: 'white',marginBottom:20 }} >              
             <Image source={searchtwo}
             resizeMode={'contain'}
             style={{width:175, height:175 ,  justifyContent:'center', alignItems: 'center'}}/>
               </View>
         

<View style={styles.chekstwo}>
<Text>Name</Text>
<Text>Title</Text>
<Text>Location</Text>
<Text>Activity</Text>
</View>
         <View >
         <ScrollView>   
           {data.map(r => 

<Card  
  style={styles.card} >
    <CardImage 
      //source={{uri: 'http://bit.ly/2GfzooV'}} 
      title="Top 10 South African beaches"
    />
    <View style={styles.cheks}>  
    
    <CardTitle
      subtitle={r.userFullName}
    />
    
    <View style={styles.content}>
      <CardContent style={{width:80,marginLeft:-10}}
     text={r.title} />
     </View>
     <View style={styles.content}>
    <CardContent  style={{width:85,marginLeft:-5}}
     text={r.address} />
     </View>
     <View style={styles.content}>
     <CardContent style={{width:100}}
     text={r.hobbies} />
    </View>

    <CardAction  
      separator={false} 
      inColumn={false}>
      <CardButton
        onPress={() => {}}
        title="Details"
        color="#FEB557"

      />
    
      <CardButton
        onPress={() => {}}
        title="Request"
        color="#FEB557"
      />
    </CardAction>

    </View>

  </Card>


            )}  
</ScrollView>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white'
  },

  card:{
   width:390,
   height:100,
   marginTop:10,
   color:'white'


  },

  content:{
    width:55,
    
  },
  chekstwo:{
   flexDirection:'row',
   marginLeft:20,
   marginBottom:0,
   marginTop:0,
   height:20,
   width:200,
   justifyContent: 'space-between' 

  },

   cheks:{ 
   flexDirection:'row',
   marginBottom:23,
   marginTop:10,
   height:50,
   justifyContent: 'space-between' 
 },

})

