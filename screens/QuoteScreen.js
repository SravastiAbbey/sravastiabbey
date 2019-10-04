import React from 'react';
import { Platform } from 'react-native';
import { Image, TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native';
import AnimatedTextSwitch from '../components/AnimatedTextSwitch';
import Colors from '../constants/Colors';

const quotes = require('../assets/quotes.json');

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
      return (
        <TouchableWithoutFeedback style={styles.container} onPress={ this.handleClick }>
          <View style={styles.quoteContainer}>
            <AnimatedTextSwitch style={styles.quoteText}>
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

const colors = {
  light: '#FFFFFF',
  dark: '#00F000',
  gray: '#96979F',
  lightGray: '#F4F6F8',
  darkGray: '#323643',
  flatDarkGray: '#2B2B2B',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  quoteText: {
    padding: 10,
    fontSize: 22,
    color: Colors.tintColor,
    fontFamily: 'caveat',
  },
  quoteAuthor: {
    color: Colors.gray,
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  quoteCategory: {
    color: Colors.gray,
    fontSize: 12,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
});
