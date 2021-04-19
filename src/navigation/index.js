import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {NavigationContainer} from '@react-navigation/native';
//import {Text, View, Button} from 'react-native';
import CurrentList from '../screens/CurrentList';
import ItemDetails from '../screens/ItemDetails';

const Stack = createStackNavigator();

const CurrentListStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CurrentListItems" component={CurrentList} />
        <Stack.Screen name="ItemDetails" component={ItemDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default CurrentListStack;
