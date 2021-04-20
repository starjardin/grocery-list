import React from 'react';
import {useCurrentList} from '../util/ListManager';
import {View, Text} from 'react-native';
export default () => {
  const {favorite} = useCurrentList();
  return (
    <View>
      {favorite.map(item => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
};
