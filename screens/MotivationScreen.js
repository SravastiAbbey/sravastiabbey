import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import UnderConstruction from '../components/UnderConstruction';
import Colors from '../constants/Colors';

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
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>
              Today, as well as I am able, may I harm no living being with my body, speech, and mind.
            </Text>
            <Text style={styles.quoteText}>
              Today, as well as I am able, may I help and serve sentient beings.
            </Text>
            <Text style={styles.quoteText}>
              Today, as well as I am able, I will cultivate bodhicitta—the altruistic intention to become a Buddha for the benefit of all living beings—and may that beautiful aspiration influence all actions of my body, speech, and mind.
            </Text>
          </View>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  quoteText: {
    padding: 10,
    fontSize: 22,
    color: Colors.tintColor,
    fontFamily: 'caveat',
  },
});
