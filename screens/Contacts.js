import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
}            from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import ContactListItem from '../components/ContactListItem';
import {fetchContacts} from "../utils/api";
import colors          from "../utils/colors";

const keyExtractor = ({phone}) => phone;

export default class Contacts extends React.Component {
  static navigationOptions = ({ navigation: { openDrawer } }) => ({
    title: 'Contacts',
    headerLeft: (
      <MaterialIcons
        name={'menu'}
        size={32}
        style={{color: colors.black, marginLeft: 20}}
        onPress={() => openDrawer() }
      />
    )
  });

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
      });
    } catch (er) {
      this.setState({
        loading: false,
        error  : true
      });
    }
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