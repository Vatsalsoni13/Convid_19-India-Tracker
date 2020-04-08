import React from 'react';
import {Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import InfoScreen from './screens/InfoScreen';
import HelpScreen from './screens/HelpScreen';
const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},

    Stats: {screen: StatsScreen},
    Info: {screen: InfoScreen},
    Help: {screen: HelpScreen},
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'purple',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

MainNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = navigation.state.index === 0;

  return {tabBarVisible};
};

const TabNavigator = createBottomTabNavigator(
  {
    Home: MainNavigator,
    Statistics: InfoScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let imageName = require('./src/home.png');
        if (routeName === 'Statistics') {
          imageName = require('./src/stats.png');
        }
        return (
          <Image
            source={imageName}
            style={{width: 25, resizeMode: 'contain', tintColor}}
          />
        );
      },
    }),

    tabBarOptions: {
      activeTintColor: 'purple',
      inactiveTintColor: 'gray',
    },
  },
);

const App = createAppContainer(TabNavigator);
export default App;
