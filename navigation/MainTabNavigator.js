import React from 'react';
import { Platform, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Colors from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';
import MotivationScreen from '../screens/MotivationScreen';
import QuoteScreen from '../screens/QuoteScreen';
import PracticeScreen from '../screens/PracticeScreen';
import MoreScreen from '../screens/MoreScreen';
import SettingsScreen from "../screens/SettingsScreen";
import FavoritesScreen from '../screens/FavoritesScreen';


const MotivationStack = createStackNavigator({
  Motivation: MotivationScreen,
});

const TabBarLabel = ({ focused, tintColor, line1, line2 }) => {
  return (
    <View>
      <Text style={{
        fontSize:11,
        textAlign:'center',
        color:tintColor
      }}>{line1}</Text>
      <Text style={{
        fontSize:11,
        textAlign:'center',
        color:tintColor,
        paddingBottom: 5
      }}>{line2}</Text>
    </View>
  )
};

MotivationStack.navigationOptions = {
  //tabBarLabel: 'Daily Motivation',
  tabBarLabel: (props) => <TabBarLabel {...props} line1="Daily" line2="Motivation"/>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ Platform.OS === 'ios' ? `heart${focused ? '_red' : ''}` : 'heart' }
    />
  ),
};

const QuoteStack = createStackNavigator({
  Quote: QuoteScreen,
});

QuoteStack.navigationOptions = {
  //tabBarLabel: 'Quote',
  tabBarLabel: (props) => <TabBarLabel {...props} line1="Quote"/>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `quote${focused ? '_red' : ''}` : 'quote'}
    />
  ),
};

const FavoritesStack = createStackNavigator({
  Quote: FavoritesScreen,
});

FavoritesStack.navigationOptions = {
  tabBarLabel: (props) => <TabBarLabel {...props} line1="Favorites"/>,
  tabBarIcon: ({ focused }) => (
      <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? `heart${focused ? '_red' : ''}` : 'heart'}
      />
  ),
};

const PracticeStack = createStackNavigator({
  Practice: PracticeScreen,
});

PracticeStack.navigationOptions = {
  tabBarLabel: (props) => <TabBarLabel {...props} line1="Practice"/>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `lotus${focused ? '_red' : ''}` : 'lotus'}
    />
  ),
};

const MoreStack = createStackNavigator({
  More: MoreScreen,
  Settings: SettingsScreen
});
MoreStack.navigationOptions = {
  tabBarLabel: (props) => <TabBarLabel {...props} line1="More"/>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-more` : 'md-more'}
    />
  ),
};

export default createBottomTabNavigator({
    MotivationStack,
    QuoteStack,
      FavoritesStack,
      PracticeStack,
      MoreStack
  },
  {
    initialRouteName: 'QuoteStack',
    tabBarOptions: {
      activeTintColor: Colors.tintColor,
      style:{
        height:70
      }
  }
});
