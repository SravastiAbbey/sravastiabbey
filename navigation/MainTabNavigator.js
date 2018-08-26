import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

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
      name={
        Platform.OS === 'ios'
          ? `ios-heart${focused ? '' : '-outline'}`
          : 'md-heart'
      }
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
      name={Platform.OS === 'ios' ? `ios-quote${focused ? '' : '-outline'}` : 'md-quote'}
    />
  ),
};

const CheckupStack = createStackNavigator({
  Checkup: CheckupScreen,
});

CheckupStack.navigationOptions = {
  tabBarLabel: 'Checkup',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-checkbox${focused ? '' : '-outline'}` : 'md-checkbox'}
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
      name={Platform.OS === 'ios' ? `ios-body${focused ? '' : '-outline'}` : 'md-body'}
    />
  ),
};

const MoreStack = createStackNavigator({
  More: MoreScreen,
});

MoreStack.navigationOptions = {
  tabBarLabel: 'More',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-more${focused ? '' : '-outline'}` : 'md-more'}
    />
  ),
};

export default createBottomTabNavigator({
  MotivationStack,
  QuoteStack,
  CheckupStack,
  PracticeStack,
  MoreStack,
});
