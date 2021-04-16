import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import CurrentList from '../screens/CurrentList';

const Stack = createStackNavigator();

const Details = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};
const CurrentListStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CurrentListItems" component={CurrentList} />
        <Stack.Screen name="CurrentListItemsDetails" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default CurrentListStack;
