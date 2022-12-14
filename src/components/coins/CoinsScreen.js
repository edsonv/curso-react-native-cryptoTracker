import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {Http} from '../../libs/http';
import {CoinsItem} from './CoinsItem';
import {Colors} from '../../res/colors';
import {CoinSearch} from './CoinsSearch';

export class CoinsScreen extends React.Component {
  state = {
    coins: [],
    allCoins: [],
    loading: true,
  };

  componentDidMount = async () => {
    this.getCoins();
  };

  getCoins = async () => {
    this.setState({loading: true});

    const res = await Http.instance.get('https://api.coinlore.net/api/tickers');

    this.setState({coins: res.data, allCoins: res.data, loading: false});
  };

  handlePress = coin => {
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  handleSearch = query => {
    const {allCoins} = this.state;

    const coinsFiltered = allCoins.filter(coin => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });

    this.setState({coins: coinsFiltered});
  };

  render() {
    const {coins, loading} = this.state;

    return (
      <View style={styles.container}>
        <CoinSearch onChange={this.handleSearch} />
        {loading ? (
          <ActivityIndicator style={styles.loader} color="#fff" size="large" />
        ) : null}
        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => this.handlePress(item)} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});
