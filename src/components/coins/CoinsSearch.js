import React from 'react';
import {TextInput, Platform, View, StyleSheet} from 'react-native';
import {Colors} from '../../res/colors';

export class CoinSearch extends React.Component {
  state = {query: ''};

  handleText = query => {
    this.setState({query});

    if (this.props.onChange) {
      this.props.onChange(query);
    }
  };

  render() {
    const query = this.state;

    return (
      <View>
        <TextInput
          onChangeText={this.handleText}
          value={query}
          placeholder="Search coin"
          placeholderTextColor="#fff"
          style={[
            styles.textInput,
            Platform.OS === 'ios'
              ? styles.textInputIOS
              : styles.textInputAndroid,
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingLeft: 16,
    color: Colors.white,
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});
