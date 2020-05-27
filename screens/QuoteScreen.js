import React from 'react';
import {
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';
import AnimatedTextSwitch from '../components/AnimatedTextSwitch';
import Colors from '../constants/Colors';
import { inject, observer } from 'mobx-react';
import styles from '../styles/main';
import HeaderBackground from "../components/HeaderBackground";
import quotesManager from '../Libraries/Quotes';
import Quotes from '../Libraries/Quotes';
import AnimatedHeart from "../components/AnimatedHeart";

@inject('observableStore')
@observer
export default class QuoteScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        quote: null,
        isFavorite:false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await quotesManager.initialize();
    this.quotes = quotesManager.data;
    this.nextQuote();
  }

  nextQuote() {
      const min = 0;
      const max = this.quotes.length - 1;
      const rand = Math.floor(min + Math.random() * (max - min));
      const currentQuote = this.quotes[rand];
      console.log(currentQuote);
      this.setState({ quote: currentQuote, isFavorite:currentQuote.favorite === 1 });
  }

  handleClick() {
      this.nextQuote();
  }

  render() {

    if (this.quotes == null) return null;

    console.log("Num quotes to render = " + this.quotes.length);

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
      marginBottom: 20,
      padding: 20,
        paddingTop:10
    }]);

    let quote = this.state.quote;

    console.log(this.state);

    let pullQuote = quote.pullquote;
    let author = quote.author;
    let category = quote.category;
    let id = quote.id;
    let quoteText = quote.quote.replace(/\$/g, "\n\n");

    return (
      <ScrollView style={styles.container}>
        <AnimatedHeart quoteId={id} isFavorite={this.state.isFavorite} toggleFavorite={ async (value) => {
            await Quotes.setIsFavorite(id, value ? 1 : 0);
            this.setState({isFavorite:value});
        }}/>
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