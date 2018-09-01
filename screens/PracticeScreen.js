import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import UnderConstruction from '../components/UnderConstruction';

export default class PracticeScreen extends React.Component {
  static navigationOptions = {
    title: 'Practice',
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
