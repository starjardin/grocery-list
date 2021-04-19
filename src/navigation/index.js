import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, Image, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//import {Text, View, Button} from 'react-native';
import CurrentList from '../screens/CurrentList';
import ItemDetails from '../screens/ItemDetails';
import FavoritesList from '../screens/FavoritesList';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CurrentListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CurrentListItems" component={CurrentList} />
      <Stack.Screen
        name="ItemDetails"
        component={ItemDetails}
        options={({route}) => {
          return {
            headerTitle: () => <Text>{route.params.item.name}</Text>,
          };
        }}
      />
    </Stack.Navigator>
  );
};

const FavoritesListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavoritesList" component={FavoritesList} />
    </Stack.Navigator>
  );
};

function Tabs() {
  let image;
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, focused}) => {
            if (route.name === 'CurrentListStack') {
              image = Platform.select({
                ios: require('../assets/icons/ios-list.png'),
                android: require('../assets/icons/md-list.png'),
              });
            } else if (route.name === 'FavoritesList') {
              image = Platform.select({
                ios: focused
                  ? require('../assets/icons/ios-star.png')
                  : require('../assets/icons/ios-star-outline.png'),
                android: focused
                  ? require('../assets/icons/md-star.png')
                  : require('../assets/icons/md-star-outline.png'),
              });
            }
            return (
              <Image
                source={image}
                resizeMode="contain"
                style={{width: 25, tintColor: color}}
              />
            );
          },
        })}>
        <Tab.Screen name="CurrentListStack" component={CurrentListStack} />
        <Tab.Screen name="FavoritesList" component={FavoritesListStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Tabs;
