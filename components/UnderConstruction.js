import React from 'react';
import { Icon } from 'expo';
import { StyleSheet, Text, View } from 'react-native';


export default class UnderConstruction extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Icon.Ionicons
        name="ios-construct"
        size={128}
        color={"tomato"}
      />
      <Text style={styles.optionText}>
      {this.props.name} Under Construction!
      </Text>
      <Text style={styles.getStartedText}>
      Sravasti Abbey is among the first of its kind—an American Buddhist monastic community where nuns and monks and lay students learn, practice, and live the Buddha’s teachings.
      </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
  },
  optionText: {
    fontSize: 32,
    marginTop: 1,
    color: "tomato",
  },
  getStartedText: {
    marginTop: 20,
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});