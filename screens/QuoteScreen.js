import React from 'react';
import { Image, TouchableWithoutFeedback, StyleSheet, View, Text, ScrollView } from 'react-native';
import AnimatedTextSwitch from '../components/AnimatedTextSwitch';
import Colors from '../constants/Colors';
import { inject, observer } from 'mobx-react';
import styles from '../styles/main';
import HeaderBackground from "../components/HeaderBackground";
import quotesManager from '../Libraries/Quotes';

@inject('observableStore')
@observer
export default class QuoteScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      random: 0,
      quotes: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await quotesManager.initialize();
    this.setState({ quotes: quotesManager.data });
  }

  handleClick() {
    const min = 0;
    const max = this.state.quotes.length - 1;
    const rand = Math.floor(min + Math.random() * (max - min));
    this.setState({ random: rand });
  }

  render() {

    if (this.state.quotes == null) return null;

    console.log("Num quotes to render = " + this.state.quotes.length);

    // get MobX store for style props
    let store = this.props.observableStore;

    // combined font props from store with global styles
    let quoteTextStyle = StyleSheet.flatten([styles.quoteText, {
      fontSize: store.adjustedFontSize,
      fontFamily: store.baseFontFamily,
      padding: 20,
      paddingTop: 0
    }]);

    let pullQuoteTextStyle = StyleSheet.flatten([styles.quoteText, {
      fontSize: store.adjustedFontSize*1.3,
      fontFamily: store.baseFontFamily,
      fontStyle: 'italic',
      textAlign: "center",
      marginTop: 20,
      marginBottom: 20,
      padding: 20,
    }]);

    let quote = this.state.quotes[this.state.random];

    let pullQuote = quote.PullQuote;
    let author = quote.Author;
    let category = quote.Category;
    let quoteText = quote.Quote.replace(/\$/g, "\n\n");

    return (
      <ScrollView style={styles.container}>
        <TouchableWithoutFeedback onPress={ this.handleClick }>
            <View style={[styles.quoteContainer, {paddingBottom:50}]}>
              <AnimatedTextSwitch style={pullQuoteTextStyle}>
                {pullQuote}
              </AnimatedTextSwitch>
              <AnimatedTextSwitch style={quoteTextStyle}>
                {quoteText}
              </AnimatedTextSwitch>
              <AnimatedTextSwitch style={{...styles.quoteAuthor}}>
                by {author}
              </AnimatedTextSwitch>
              <AnimatedTextSwitch style={{...styles.quoteCategory}}>
                category: {category}
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