import React              from 'react';
import {MaterialIcons}    from '@expo/vector-icons';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
}                         from 'react-native';
import colors             from "../utils/colors";
import {fetchUserContact} from "../utils/api";
import ContactThumbnail   from "../components/ContactThumbnail";
import store              from "../store";

export default class User extends React.Component {
  static navigationOptions = ({navigation: { navigate }}) => ({
    title          : 'Me',
    headerTintColor: 'white',
    headerStyle    : {
      backgroundColor: colors.blue
    },
    headerRight    : (
      <MaterialIcons
        name="settings"
        size={24}
        style={{color: 'white', marginRight: 10}}
        onPress={() => navigate('Options')}
      />
    ),
  });

  state = {
    user   : store.getState().user,
    loading: store.getState().isFetchingUser,
    error  : store.getState().error
  };

  async componentDidMount() {
    this.unsubscribe = store.onChange( () => {
      this.setState({
        user   : store.getState().user,
        loading: store.getState().isFetchingUser,
        error  : store.getState().error
      });
    });

    const user = await fetchUserContact();

    store.setState({
      user,
      isFetchingUser: false
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
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