import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  Pressable,
  Alert,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Http} from '../../libs/http';
import {Colors} from '../../res/colors';
import {CoinMarketItem} from './CoinMarketItem';
import {Storage} from '../../libs/storage';

export class CoinDetailScreen extends React.Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false,
  };

  getSymbolIcon = name => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  getSections = coin => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change_24h',
        data: [coin.percent_change_24h],
      },
    ];

    return sections;
  };

  getMarkets = async coinId => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    this.setState({markets});
  };

  toggleFavorite = () => {
    if (this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  };

  addFavorite = async () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;
    const stored = await Storage.instance.store(key, coin);

    if (stored) {
      this.setState({isFavorite: true});
    }
  };

  removeFavorite = async () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {text: 'Cancel', onPress: () => {}, style: 'Cancel'},
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${this.state.coin.id}`;
          await Storage.instance.remove(key);
          this.setState({isFavorite: false});
        },
        style: 'destructive',
      },
    ]);
  };

  getFavorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`;
      const favStr = await Storage.instance.get(key);
      if (favStr !== null) {
        this.setState({isFavorite: true});
      }
    } catch (error) {
      console.error('get favorites error: ', error);
    }
  };

  componentDidMount() {
    const {coin} = this.props.route.params;
    this.props.navigation.setOptions({title: coin.symbol});
    this.getMarkets(coin.id);
    this.setState({coin}, () => {
      this.getFavorite();
    });
  }

  render() {
    const {coin, markets, isFavorite} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image
              style={styles.iconImg}
              source={{uri: this.getSymbolIcon(coin.name)}}
            />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>

          <Pressable
            onPress={this.toggleFavorite}
            style={[
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
            ]}>
            <Text style={styles.btnFavoriteText}>
              {isFavorite ? 'Remove favorite' : 'Add to favorites'}
            </Text>
          </Pressable>
        </View>
        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />
        <Text style={styles.marketsTitle}>Markets</Text>
        <FlatList
          horizontal={true}
          style={styles.list}
          data={markets}
          renderItem={({item}) => <CoinMarketItem item={item} />}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeader: {
    backgroundColor: 'rga(0,0,0,.1)',
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  titleText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    aspectRatio: 1,
  },
  section: {
    maxHeight: 220,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  marketsTitle: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  btnFavoriteText: {
    color: Colors.white,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
});
