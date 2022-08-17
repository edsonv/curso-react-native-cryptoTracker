import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../res/colors';

export const FavoritesEmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Yo don't have any favorites yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
});
