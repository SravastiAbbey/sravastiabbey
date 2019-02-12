import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { WebBrowser } from 'expo';
import { Icon } from 'expo';
import Touchable from 'react-native-platform-touchable';
import Colors from '../constants/Colors';

export default class MoreScreen extends React.Component {
  static navigationOptions = {
    title: 'More',
    headerTintColor: Colors.tintColor,
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
          Resources
        </Text>

        <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handlePressAbout}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
            <Icon.Ionicons name="ios-information-circle-outline" size={22} />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                About
              </Text>
            </View>
          </View>
        </Touchable>

        <Touchable
          background={Touchable.Ripple('#ccc', false)}
          style={styles.option}
          onPress={this._handlePressStudy}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Icon.Ionicons name="ios-folder-outline" size={22} />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Study
              </Text>
            </View>
          </View>
        </Touchable>

        <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handlePressBook}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Icon.Ionicons name="ios-book-outline" size={22} />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Free Distribution Books
              </Text>
            </View>
          </View>
        </Touchable>

        <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handlePressContact}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Icon.Ionicons name="ios-chatboxes-outline" size={22} />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Contact Sravasti Abbey
              </Text>
            </View>
          </View>
        </Touchable>
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
    WebBrowser.openBrowserAsync('https://sravastiabbey.org');
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