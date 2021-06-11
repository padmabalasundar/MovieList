/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import HomeScreen from './src/screens/HomeScreen'
import DetailsScreen from './src/screens/DetailsScreen'
import HelloWorld from './src/screens/HelloWorld'

const Stack = createStackNavigator();

export default function App() {
  
  return (
   
       <NavigationContainer>
         <Stack.Navigator headerMode ='none' >
           <Stack.Screen name="Home" component={HomeScreen} />
           <Stack.Screen name="Details" component={DetailsScreen} />
           <Stack.Screen name="Hello" component={HelloWorld} />
         </Stack.Navigator>
       </NavigationContainer>
  
  );
};

