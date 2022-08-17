import AsyncStorage from '@react-native-async-storage/async-storage';

export class Storage {
  static instance = new Storage();

  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('Storage store error: ', error);
      return false;
    }
  };

  get = async key => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Storage get error: ', error);
      throw Error(error);
    }
  };

  multiget = async keys => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.error('Storage multiget error: ', error);
      throw Error(error);
    }
  };

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Storage getAllKeys error: ', error);
      throw Error(error);
    }
  };

  remove = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error: ', error);
      return false;
    }
  };
}
