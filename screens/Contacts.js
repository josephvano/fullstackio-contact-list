import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
}            from 'react-native';

import ContactListItem from '../components/ContactListItem';
import {fetchContacts} from "../utils/api";
import store           from "../store";

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
    })
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

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