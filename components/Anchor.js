import { Linking, StyleSheet, Text } from 'react-native';
import React from 'react';
import Colors from "../constants/Colors";

export default class Anchor extends React.Component {
  _handlePress = () => {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <Text style={styles.linkStyle} onPress={this._handlePress}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  linkStyle: {
    textDecorationLine: 'underline'
  }
});
