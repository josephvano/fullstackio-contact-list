import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
}            from 'react-native';

import ContactThumbnail from '../components/ContactThumbnail';
import {fetchContacts}  from "../utils/api";

const keyExtractor = ({phone}) => phone;

export default class Favorites extends React.Component {
  static navigationOptions = {
    title: 'Favorites'
  };

  state = {
    contacts: [],
    loading : true,
    error   : false
  };

  async componentDidMount() {
    try {
      const contacts = await fetchContacts();

      this.setState({
        contacts,
        loading: false,
        error  : false
      })
    } catch (er) {
      this.setState({
        error  : true,
        loading: false
      });
    }
  }

  renderFavoriteThumbnail = ({item}) => {
    const {avatar}                 = item;
    const {navigation: {navigate}} = this.props;

    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigate('Profile', {contact: item})}
      />
    );
  };

  render() {
    const {error, loading, contacts} = this.state;
    const favorites                  = contacts.filter(contact => contact.favorite);

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size={'large'}/>}
        {error && <Text style={styles.error}>Error</Text>}

        {!loading && !error &&(
          <FlatList
            data={favorites}
            keyExtractor={keyExtractor}
            numColumns={3}
            contentContainerStyle={styles.list}
            renderItem={this.renderFavoriteThumbnail}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent : 'center',
    flex           : 1
  },
  list     : {
    alignItems: 'center'
  },
  error    : {
    color: 'red'
  }
});