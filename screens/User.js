import React              from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
}                         from 'react-native';
import colors             from "../utils/colors";
import {fetchUserContact} from "../utils/api";
import ContactThumbnail   from "../components/ContactThumbnail";

export default class User extends React.Component {
  static navigationOptions = {
    title          : 'Me',
    headerTintColor: 'white',
    headerStyle    : {
      backgroundColor: colors.blue
    }
  };

  state = {
    user   : [],
    loading: true,
    error  : false
  };

  async componentDidMount() {
    try {
      const user = await fetchUserContact();

      this.setState({
        user,
        loading: false,
        error  : false
      });
    } catch (er) {
      this.setState({
        error: true
      });
    }
  }

  render() {
    const {user, loading, error} = this.state;
    const {avatar, phone, name}  = user;

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size={'large'}/>}
        {error && <Text style={styles.error}>Error ...</Text>}

        {!loading && !error && (
          <ContactThumbnail
            avatar={avatar}
            phone={phone}
            name={name}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    justifyContent : 'center',
    alignItems     : 'center',
    backgroundColor: colors.blue
  }
});