import React from 'react';
import {
  SectionList,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';

import {useCurrentList} from '../util/ListManager';

import ListItem, {SectionHeadear, Separator} from './ListItem';
import AddItem from './AddItem';
export default ({navigation}) => {
  const {addItem, removeItem, list, addToCart, cart} = useCurrentList();
  console.log(cart);
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <SectionList
          //data={list}
          sections={[
            {title: 'List', data: list},
            {title: 'Cart', data: cart},
          ]}
          renderSectionHeader={({section}) => (
            <SectionHeadear title={section.title} />
          )}
          renderItem={({item, index}) => (
            <ListItem
              name={item.name}
              onFavoritePress={() => alert('todo: handle favorite!')}
              isFavorite={index < 5}
              onAddedSwipe={() => addToCart(item)}
              onDeleteSwipe={() => removeItem(item.id)}
              onRowPress={() =>
                navigation.navigate('ItemDetails', {
                  item: item,
                })
              }
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
