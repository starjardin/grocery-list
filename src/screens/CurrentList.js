import React, {useState} from 'react';
import {SafeAreaView, FlatList, KeyboardAvoidingView} from 'react-native';
import {v4 as uuid} from 'uuid';

import nachos from '../data/nachos';
import ListItem, {Separator} from './ListItem';
import AddItem from './AddItem';
export default () => {
  const [list, setList] = useState(nachos);
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
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <Separator />}
          ListHeaderComponent={() => (
            <AddItem
              onSubmitEditing={({nativeEvent: {text}}) => {
                setList([{id: uuid(), name: text}, ...list]);
              }}
            />
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
