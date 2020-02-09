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

export default class User extends React.Component {
  static navigationOptions = ({navigation: { navigate, openDrawer }}) => ({
    title          : 'Me',
    headerTintColor: 'white',
    headerStyle    : {
      backgroundColor: colors.blue
    },
    headerLeft: (
      <MaterialIcons
        name={'menu'}
        size={32}
        style={{color: 'white', marginLeft: 20}}
        onPress={() => openDrawer() }
      />
    ),
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