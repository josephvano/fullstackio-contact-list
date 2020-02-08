import {
  createStackNavigator,
  createBottomTabNavigator,
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

const getTabBarIcon = (icon) => ({tintColor}) => (
  <MaterialIcons name={icon} size={26} style={{color: tintColor}}/>
);

const ContactsScreen = createStackNavigator(
  {
    Contacts,
    Profile
  },
  {
    initialRouteName : 'Contacts',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('list')
    }
  }
);

const FavoritesScreen = createStackNavigator({
  Favorites,
  Profile
}, {
  initialRouteName : 'Favorites',
  navigationOptions: {
    tabBarIcon: getTabBarIcon('star')
  }
});

const UsersScreen = createStackNavigator(
  {
    User,
  },
  {
    initialRouteName : 'User',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('person')
    }
  }
);

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

export default createAppContainer(TabNavigator);
