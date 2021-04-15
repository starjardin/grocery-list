import React from 'react';

import {
  SafeAreaView,
  Text,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import ListItem, {Separator} from './ListItem';
import nachos from '../data/nachos';

const styles = StyleSheet.create({
  touch: {
    padding: 30,
  },
});

export default () => {
  return (
    <SafeAreaView>
      <TouchableHighlight
        style={styles.touch}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => console.log('Hello world')}>
        <Text> Hello world </Text>
      </TouchableHighlight>

      <ScrollView>
        {nachos.map(item => {
          return (
            <React.Fragment key={item.id}>
              <ListItem name={item.name} />
              <Separator />
            </React.Fragment>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
