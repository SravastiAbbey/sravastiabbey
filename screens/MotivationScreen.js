import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import { inject, observer } from "mobx-react";
import styles from '../styles/main';

@inject('observableStore')
@observer
export default class MotivationScreen extends React.Component {
  static navigationOptions = {
    title: 'Motivation',
    headerTintColor: Colors.tintColor,
    headerTitleStyle :{textAlign: 'center', alignSelf:'center', flex:1},
    headerBackground: (
      <Image style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'contain' }} 
        source={require('../assets/images/header.png')}
      />
    ),
  };

  render() {

    // get MobX store for style props
    let store = this.props.observableStore;

    // combined font props from store with global styles
    let quoteTextStyle = StyleSheet.flatten([styles.quoteText, {
      fontSize: store.baseFontSize,
      fontFamily: store.baseFontFamily,
    }]);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.quoteContainer}>
          <Text style={quoteTextStyle}>
            Today, as well as I am able, may I harm no living being with my body, speech, and mind.
          </Text>
          <Text style={quoteTextStyle}>
            Today, as well as I am able, may I help and serve sentient beings.
          </Text>
          <Text style={quoteTextStyle}>
            Today, as well as I am able, I will cultivate bodhicitta—the altruistic intention to become a Buddha for the benefit of all living beings—and may that beautiful aspiration influence all actions of my body, speech, and mind.
          </Text>
        </View>
      </ScrollView>
    );
  }
}