import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import UnderConstruction from '../components/UnderConstruction';

export default class QuoteScreen extends React.Component {
  static navigationOptions = {
    title: 'Quote',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <UnderConstruction name="Quote" />
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
