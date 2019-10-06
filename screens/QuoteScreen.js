import React from 'react';
import { Platform } from 'react-native';
import { Image, TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native';
import AnimatedTextSwitch from '../components/AnimatedTextSwitch';
import Colors from '../constants/Colors';
import { inject, observer } from 'mobx-react';
import styles from '../styles/main';
const quotes = require('../assets/quotes.json');

@inject('observableStore')
@observer
export default class QuoteScreen extends React.Component {
  constructor(props) {
    super(props); 
    this.state = { 
      random: 0, 
    };
    this.handleClick = this.handleClick.bind(this);
  }   
    
  handleClick() {
    const min = 0;
    const max = quotes.quotes.length - 1;
    const rand = Math.floor(min + Math.random() * (max - min));
    this.setState({ random: rand }); 
  }
  render() {

    let store = this.props.observableStore;

    let quoteTextStyle = StyleSheet.flatten([styles.quoteText, {
      fontSize: store.quoteFontSize,
      fontFamily: store.quoteFontFamily,
    }]);

      return (
        <TouchableWithoutFeedback style={styles.container} onPress={ this.handleClick }>
          <View style={styles.quoteContainer}>
            <AnimatedTextSwitch style={quoteTextStyle}>
              {quotes.quotes[this.state.random].quote}            
            </AnimatedTextSwitch>
            <AnimatedTextSwitch style={{...styles.quoteAuthor}}>
              by {quotes.quotes[this.state.random].author}
            </AnimatedTextSwitch>
            <AnimatedTextSwitch style={{...styles.quoteCategory}}>
              category: {quotes.quotes[this.state.random].category}
            </AnimatedTextSwitch>
          </View>
        </TouchableWithoutFeedback>  
      );
  }

  static navigationOptions = {
    title: 'Quote',
    headerTintColor: Colors.tintColor,
    headerTitleStyle :{textAlign: 'center', alignSelf:'center', flex:1},
    headerBackground: (
      <Image style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'contain' }} 
        source={require('../assets/images/header.png')}
      />
    ),
  };
}