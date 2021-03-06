import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import UnderConstruction from '../components/UnderConstruction';
import Colors from '../constants/Colors';

export default class PracticeScreen extends React.Component {
  static navigationOptions = {
    title: 'Practice',
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
      <UnderConstruction name="Practice" />
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
