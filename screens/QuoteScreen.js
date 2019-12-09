import React from 'react';
import { Image, TouchableWithoutFeedback, StyleSheet, View, Text, ScrollView } from 'react-native';
import AnimatedTextSwitch from '../components/AnimatedTextSwitch';
import Colors from '../constants/Colors';
import { inject, observer } from 'mobx-react';
import styles from '../styles/main';
import HeaderBackground from "../components/HeaderBackground";
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

    // get MobX store for style props
    let store = this.props.observableStore;

    // combined font props from store with global styles
    let quoteTextStyle = StyleSheet.flatten([styles.quoteText, {
      fontSize: store.adjustedFontSize,
      fontFamily: store.baseFontFamily,
    }]);

    return (
      <ScrollView style={styles.container}>
        <TouchableWithoutFeedback onPress={ this.handleClick }>
            <View style={[styles.quoteContainer, {paddingBottom:50}]}>
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
      </ScrollView>
      );
  }

  static navigationOptions = {
    title: 'Quote',
    headerTintColor: Colors.tintColor,
    headerTitleStyle :{textAlign: 'center', alignSelf:'center', flex:1},
    headerBackground: <HeaderBackground/>
  };
}