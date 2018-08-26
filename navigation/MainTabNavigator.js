import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import CheckupScreen from '../screens/CheckupScreen';
import PracticeScreen from '../screens/PracticeScreen';
import MoreScreen from '../screens/MoreScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
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

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
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
      name={Platform.OS === 'ios' ? `ios-medkit${focused ? '' : '-outline'}` : 'md-medkit'}
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
  HomeStack,
  LinksStack,
  CheckupStack,
  PracticeStack,
  MoreStack,
});
