import {useState, useEffect} from 'react';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';

const updateStorageCurrentList = list => {
  AsyncStorage.setItem('@@GreceryList/CurrentList', JSON.stringify(list));
};

export const useCurrentList = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const addItem = text => {
    const newList = [{id: uuid(), name: text}, ...list];
    setList(newList);
    updateStorageCurrentList(newList);
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
  return {
    isLoading,
    addItem,
    removeItem,
    list,
  };
};
