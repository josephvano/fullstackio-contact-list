import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  View
}            from 'react-native';

import ContactListItem from '../components/ContactListItem';
import {fetchContacts} from "../utils/api";
import store           from "../store";
import getURLParams    from "../utils/getURLParams";

const keyExtractor = ({phone}) => phone;

export default class Contacts extends React.Component {
  static navigationOptions = {
    title: 'Contacts'
  };

  state = {
    contacts: store.getState().contacts,
    loading : store.getState().isFetchingContacts,
    error   : store.getState().error
  };

  async componentDidMount() {
    this.unsubscribe = store.onChange( () => {
      this.setState({
        contacts: store.getState().contacts,
        loading : store.getState().isFetchingContacts,
        error   : store.getState().error
      });
    });

    const contacts = await fetchContacts();

    store.setState({
      contacts,
      isFetchingContacts: false
    });

    Linking.addEventListener('url', this.handleOpenUrl);

    const url = await Linking.getInitialURL();
    this.handleOpenUrl(url);
  }

  componentWillUnmount(){
    Linking.removeEventListener('url', this.handleOpenUrl);
    this.unsubscribe();
  }

  handleOpenUrl(event) {
    const {navigation: {navigate}} = this.props;
    const {url}                    = event;
    const params                   = getURLParams(url);

    if (params.name) {
      const queriedContact = store.getState().contacts.find(contact => contact.name.split[0].toLowerCase() === params.name.toLowerCase());

      if (queriedContact) {
        navigate('Profile', {id: queriedContact.id});
      }
    }
  };

  renderContact = ({item}) => {
    const {avatar, phone, name}    = item;
    const {navigation: {navigate}} = this.props;

    return (
      <ContactListItem
        avatar={avatar}
        phone={phone}
        name={name}
        onPress={() => navigate('Profile', { contact: item })}/>
    );
  };

  render() {
    const {contacts, loading, error} = this.state;

    const contactsSorted = contacts.sort((a, b) => a.name.localeCompare(b.name));

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size={'large'}/>}
        {error && <Text style={styles.error}>Error ...</Text>}
        {!loading && !error && (
          <FlatList
            data={contactsSorted}
            keyExtractor={keyExtractor}
            renderItem={this.renderContact}
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
  error    : {
    color   : 'red',
    fontSize: 18
  }
});