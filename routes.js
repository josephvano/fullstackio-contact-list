import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';
import {
  MaterialIcons
} from '@expo/vector-icons';

import Contacts  from "./screens/Contacts";
import Profile   from "./screens/Profile";
import Favorites from "./screens/Favorites";
import User      from "./screens/User";
import React     from "react";
import colors    from "./utils/colors";
import Options   from "./screens/Options";

const getTabBarIcon = (icon) => ({tintColor}) => (
  <MaterialIcons name={icon} size={26} style={{color: tintColor}}/>
);

const getDrawerIcon = (icon) => ({tintColor}) => (
  <MaterialIcons name={icon} size={22} style={{color: tintColor}}/>
);

const ContactsScreen = createStackNavigator(
  {
    Contacts,
    Profile
  },
  {
    initialRouteName : 'Contacts',
    navigationOptions: {
      drawerIcon: getDrawerIcon('list')
    }
  }
);

const FavoritesScreen = createStackNavigator({
  Favorites,
  Profile
}, {
  initialRouteName : 'Favorites',
  navigationOptions: {
    drawerIcon: getDrawerIcon('star')
  }
});

const UsersScreen = createStackNavigator(
  {
    User,
    Options,
  },
  {
    mode: 'modal',
    initialRouteName : 'User',
    navigationOptions: {
      drawerIcon: getDrawerIcon('person')
    }
  }
);

const DrawerNavigator = createDrawerNavigator({
  Contacts : ContactsScreen,
  Favorites: FavoritesScreen,
  User     : UsersScreen
}, {
  initialRouteName: 'Contacts'
});

const TabNavigator = createBottomTabNavigator({
  Contacts : ContactsScreen,
  Favorites: FavoritesScreen,
  User     : UsersScreen
}, {
  initialRouteName: 'Contacts',
  tabBarPosition  : 'bottom',
  tabBarOptions   : {
    style            : {
      backgroundColor: colors.grey
    },
    showLabel        : false,
    showIcon         : true,
    activeTintColor  : colors.blue,
    inactiveTintColor: colors.greyDark
  }
});

export default createAppContainer(DrawerNavigator);
