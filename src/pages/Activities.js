import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import { CardView } from 'react-native-simple-card-view';
import Logo from '../pages/Logo';

export default class Welcome extends Component<{}> {
  render(){
  return (
    
            <View style={styles.container}>
              <Text> Your Activity </Text>
      <View style={styles.cardContainer}>
    <View style={styles.cardContent}>   
   <CardView >
              <Text>
             Preferred:    {this.props.navigation.state.params.gender} 
                  {this.props.navigation.state.params.items} 
             </Text>
             <Text>
            Comment:     {this.props.navigation.state.params.title}
             </Text>
             <Text>
          Activity Point:    {this.props.navigation.state.params.hobbies}
             </Text>
    </CardView>  
           </View>
              </View>
                
                <Text> Who wants to join you</Text>

               <Text>A Want join</Text>
             <Text>
           {this.props.navigation.state.params.hobbies}
             </Text>


           </View>
        
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 25,
    marginBottom:175
  },

 cardContainer:{
  paddingTop: 30,
    paddingBottom: 30,
    shadowColor: 'black',
    shadowOffset: { x: 0, y: 10 },
    shadowOpacity: 1,
    borderLeftColor: 'gray',
    borderRightColor:'gray',
    borderTopColor:'gray',
    borderBottomColor:'gray',
    borderLeftWidth: 2,
    borderRightWidth:2,
    borderTopWidth:2,
    borderBottomWidth:2,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom:35
 },
 cardContent:{
  flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
  },
})