import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import UnderConstruction from '../components/UnderConstruction';


export default class CheckupScreen extends React.Component {
  static navigationOptions = {
    title: 'Checkup',
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
