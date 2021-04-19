import {useState, useEffect} from 'react';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';

const updateStorageCurrentList = list => {
  AsyncStorage.setItem('@@GreceryList/CurrentList', JSON.stringify(list));
};

const updateStorageCurrentart = list => {
  AsyncStorage.setItem('@@GreceryList/CurrentCart', JSON.stringify(list));
};

export const useCurrentList = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

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

  const addToCart = item => {
    removeItem(item.id);
    const newCart = [item, ...cart];
    setCart(newCart);
    updateStorageCurrentart(newCart);
  };

  useEffect(() => {
    setTimeout(() => {
      Promise.all([
        AsyncStorage.getItem('@@GreceryList/CurrentList'),
        AsyncStorage.getItem('@@GreceryList/CurrentCart'),
      ])
        .then(([list, cartItems]) => [JSON.parse(list), JSON.parse(cartItems)])
        .then(([list, cartItems]) => {
          if (list) {
            setList(list);
          }
          if (cartItems) {
            setCart(cartItems);
          }
          setIsLoading(false);
        });
    }, 2000);
  }, []);

  return {
    isLoading,
    addItem,
    removeItem,
    list,
    addToCart,
    cart,
  };
};
