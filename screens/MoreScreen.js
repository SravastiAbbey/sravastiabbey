import React from 'react';
import { StyleSheet, Image, Text, View, Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import Touchable from 'react-native-platform-touchable';
import Colors from '../constants/Colors';

const SettingsItem = ({iconName, title, onPress}) => {
  return (
    <Touchable
      style={styles.option}
      background={Touchable.Ripple('#ccc', false)}
      onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={iconName} size={22} />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>
            {title}
          </Text>
        </View>
      </View>
    </Touchable>
  )
}

export default class MoreScreen extends React.Component {
  static navigationOptions = {
    title: 'More',
    headerTintColor: Colors.tintColor,
    headerTitleStyle :{textAlign: 'center', alignSelf:'center', flex:1},
    headerBackground: (
      <Image style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'contain' }} 
        source={require('../assets/images/header.png')}
      />
    ),
  };

  render() {
    return (
      <View>
        <Text style={styles.optionsTitleText}>
          Settings
        </Text>

        <SettingsItem
          onPress={this._handlePressSettings}
          title="App Setings"
          iconName="ios-settings"
        />

        <Text style={styles.optionsTitleText}>
          Resources
        </Text>

        <SettingsItem
          onPress={this._handlePressAbout}
          title="About"
          iconName="ios-information-circle"
        />

        <SettingsItem
          onPress={this._handleBuddhaHall}
          title="Buddha Hall Project"
          iconName="ios-information-circle"
        />

          <SettingsItem
              onPress={this._handlePressInsightTimerGroup}
              title="Insight Timer Group"
              iconName="ios-information-circle"
          />

        <SettingsItem
          onPress={this._handlePressStudy}
          title="Study"
          iconName="ios-folder-open"
        />

        <SettingsItem
          onPress={this._handlePressBook}
          title="Free Distribution Books"
          iconName="ios-book"
        />

        <SettingsItem
          onPress={this._handlePressContact}
          title="Contact Sravasti Abbey"
          iconName="ios-chatboxes"
        />

          <SettingsItem
              onPress={this._handlePressReportBug}
              title="Report a Problem with the App"
              iconName="ios-chatboxes"
          />

      </View>
    );
  }

  _handlePressAbout = () => {
    WebBrowser.openBrowserAsync('https://sravastiabbey.org/who-we-are/');
  };

  _handlePressStudy = () => {
    WebBrowser.openBrowserAsync('https://sravastiabbey.org/learn-meditation/');
  };

  _handlePressBook = () => {
    WebBrowser.openBrowserAsync('http://thubtenchodron.org/books/for-free-distribution/');
  };

  _handlePressContact = () => {
      Linking.openURL('mailto:office.sravasti@gmail.com?subject=Mobile+App+Contact');
  };

    _handlePressReportBug = () => {
        Linking.openURL('mailto:office.sravasti@gmail.com?subject=Mobile+App+Bug+Report');
    };

  _handleBuddhaHall = () => {
    WebBrowser.openBrowserAsync('https://sravastiabbey.org/giving/build-buddha-hall/');
  };

  _handlePressSettings = () => {
    const {navigate} = this.props.navigation;
    navigate('Settings')
  }


    _handlePressInsightTimerGroup = () => {
        WebBrowser.openBrowserAsync('https://insighttimer.com/sravastimonastics');
    };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
});