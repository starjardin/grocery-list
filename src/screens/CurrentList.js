import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {v4 as uuid} from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';

import nachos from '../data/nachos';

const updateStorageCurrentList = list => {
  AsyncStorage.setItem('@@GreceryList/CurrentList', JSON.stringify(list));
};

import ListItem, {Separator} from './ListItem';
import AddItem from './AddItem';
export default () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const addItem = text => {
    const newList = [{id: uuid(), name: text}, ...list];
    setList(newList);
    updateStorageCurrentList(newList);
    setList();
  };

  const removeItem = id => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
    updateStorageCurrentList(newList);
  };

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('@@GreceryList / CurrentList')
        .then(data => JSON.parse(data))
        .then(data => {
          if (data) {
            setList(data);
          }
          setIsLoading(false);
        });
    }, 2000);
  });

  //if (isLoading) {
  //  return <SafeAreaView>Loading....</SafeAreaView>;
  //}

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
