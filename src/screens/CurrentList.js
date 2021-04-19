import React from 'react';
import {SafeAreaView, FlatList, KeyboardAvoidingView} from 'react-native';

import {useCurrentList} from '../util/ListManager';

import ListItem, {Separator} from './ListItem';
import AddItem from './AddItem';
export default ({navigation}) => {
  const {addItem, removeItem, list} = useCurrentList();
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
              onRowPress={() => navigation.navigate('ItemDetails')}
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
