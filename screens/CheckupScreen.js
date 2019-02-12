import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import UnderConstruction from '../components/UnderConstruction';
import Colors from '../constants/Colors';


export default class CheckupScreen extends React.Component {
  static navigationOptions = {
    title: 'Checkup',
    headerTintColor: Colors.tintColor,
    headerBackground: (
      <Image style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'contain' }} 
        source={require('../assets/images/header.png')}
      />
    ),
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <UnderConstruction name="Checkup" />
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
});
