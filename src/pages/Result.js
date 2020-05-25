import React, { Component, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Picker,
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



export default class Result extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [],
      isLoading: true,
    };

  }
  

   render() {
   	const data = this.props.navigation.state.params.activities
    return (
      <View>
         <View>    
           {data.map(r => <Text>{r.title}</Text>)}    
        </View>
      </View>
    );
  }
}