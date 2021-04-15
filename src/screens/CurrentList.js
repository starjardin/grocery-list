import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import nachos from '../data/nachos';
import ListItem, {Separator} from './ListItem';
export default () => {
  return (
    <SafeAreaView>
      <ScrollView>
        {nachos.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem
              name={item.name}
              onFavoritePress={() => alert('todo: handle favorite')}
              isFavorite={index < 5}
            />
            <Separator />
          </React.Fragment>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
