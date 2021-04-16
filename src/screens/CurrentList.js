import React, {useState} from 'react';
import {SafeAreaView, FlatList, KeyboardAvoidingView} from 'react-native';
import {v4 as uuid} from 'uuid';

import nachos from '../data/nachos';
import ListItem, {Separator} from './ListItem';
import AddItem from './AddItem';
export default () => {
  const [list, setList] = useState(nachos);

  const addItem = text => {
    setList([{id: uuid(), name: text}, ...list]);
  };

  const removeItem = id => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <FlatList
          data={list}
          renderItem={({item, index}) => (
            <ListItem
              name={item.name}
              onFavoritePress={() => alert('todo: handle favorite!')}
              isFavorite={index < 5}
              onAddedSwipe={() => removeItem(item.id)}
              onDeleteSwipe={() => removeItem(item.id)}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <Separator />}
          ListHeaderComponent={() => (
            <AddItem
              onSubmitEditing={({nativeEvent: {text}}) => addItem(text)}
            />
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
