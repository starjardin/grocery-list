import React, {useRef} from 'react';

import {View, TextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 18,
    padding: 10,
    borderRadius: 3,
  },
});
const AddItem = ({onSubmitEditing, style, ...restProps}) => {
  const input = useRef(null);
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]}
        placeholder="Add new item...."
        ref={input}
        onSubmitEditing={evt => {
          if (onSubmitEditing) {
            onSubmitEditing(evt);
          }
          input.current.clear();
        }}
        {...restProps}
      />
    </View>
  );
};

export default AddItem;
