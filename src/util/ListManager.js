import {useState, useEffect} from 'react';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';

const updateStorageCurrentList = list => {
  AsyncStorage.setItem('@@GreceryList/CurrentList', JSON.stringify(list));
};

const updateStorageCurrentCart = list => {
  AsyncStorage.setItem('@@GreceryList/CurrentCart', JSON.stringify(list));
};

const updateStorageCurrentFavorite = list => {
  AsyncStorage.setItem('@@GreceryList/CurrentFavorite', JSON.stringify(list));
};

export const useCurrentList = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [favorite, setFavorite] = useState([]);

  const addItem = text => {
    const newList = [{id: uuid(), name: text, isFavorite: false}, ...list];
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
    updateStorageCurrentCart(newCart);
  };

  const addToFavorite = item => {
    const newFavorite = [item, ...favorite];
    setFavorite(newFavorite);
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
    favorite,
    addToFavorite,
  };
};
