import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Image } from 'react-native';

import Colors from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';
import MotivationScreen from '../screens/MotivationScreen';
import QuoteScreen from '../screens/QuoteScreen';
import CheckupScreen from '../screens/CheckupScreen';
import PracticeScreen from '../screens/PracticeScreen';
import MoreScreen from '../screens/MoreScreen';

const MotivationStack = createStackNavigator({
  Motivation: MotivationScreen,
});

MotivationStack.navigationOptions = {
  tabBarLabel: 'Motivation',
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
  tabBarLabel: 'Quote',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `quote${focused ? '_red' : ''}` : 'quote'}
    />
  ),
};

const CheckupStack = createStackNavigator({Checkup: CheckupScreen});

CheckupStack.navigationOptions = {
  tabBarLabel: 'Checkup',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `list${focused ? '_red' : ''}` : 'list'}
    />
  ),
};

const PracticeStack = createStackNavigator({
  Pricetice: PracticeScreen,
});

PracticeStack.navigationOptions = {
  tabBarLabel: 'Practice',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `lotus${focused ? '_red' : ''}` : 'lotus'}
    />
  ),
};

const MoreStack = createStackNavigator({More: MoreScreen});
MoreStack.navigationOptions = {
  tabBarLabel: 'More',
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
    PracticeStack,
    MoreStack,
  }, 
  {
    initialRouteName: 'QuoteStack',
    tabBarOptions: {
    activeTintColor: Colors.tintColor,
  }
});
