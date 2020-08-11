import React from 'react';
import {
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    ScrollView,
    Text
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

    static navigationOptions = {
        title: 'Favorites',
        headerTintColor: Colors.tintColor,
        headerTitleStyle :{textAlign: 'center', alignSelf:'center', flex:1},
        headerBackground: <HeaderBackground/>
    };

  constructor(props) {
      super(props);
      this.state = {
          quote: null,
          isFavorite:false,
          unsubscribe: null,
          loading: true,
          currentQuoteIndex: -1
      };
      const unsubscribe = this.props.navigation.addListener('willFocus', async () => {
          this.setState({loading: true});
          await quotesManager.initializeFavorites();
          this.quotes = quotesManager.data;
          this.nextQuote();
      });
      this.unsubscribe = unsubscribe;
    this.handleClick = this.handleClick.bind(this);

  }

  nextQuote() {
      if (this.quotes && this.quotes.length > 0) {
          let nextIndex = this.state.currentQuoteIndex + 1 >= this.quotes.length ? 0 : this.state.currentQuoteIndex + 1;
          const currentQuote = this.quotes[nextIndex];
          console.log("currentQuote", currentQuote);
          this.setState({
              quote: currentQuote,
              isFavorite: currentQuote.favorite === 1,
              currentQuoteIndex: nextIndex,
              loading: false
          });
      }
      else {
          this.setState({
              loading: false
          });
      }
  }

  handleClick() {
      this.nextQuote();
  }

    render() {

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

        let numFavsTextStyle = StyleSheet.flatten([styles.quoteText, {
            fontSize: store.adjustedFontSize*0.7,
            fontFamily: store.baseFontFamily,
            fontStyle: 'italic',
            textAlign: "center",
            marginLeft: 5
        }]);

        if (this.state.loading) {
            return (
                <ScrollView style={styles.container}>
                    <View style={[styles.quoteContainer, {paddingBottom:50}]}>
                        <AnimatedTextSwitch style={pullQuoteTextStyle}>
                            Loading...
                        </AnimatedTextSwitch>
                    </View>
                </ScrollView>
            );
        }

        if (this.quotes == null) {
            return (
                <ScrollView style={styles.container}>
                    <View style={[styles.quoteContainer, {paddingBottom:50}]}>
                        <AnimatedTextSwitch style={pullQuoteTextStyle}>
                            Error loading quotes
                        </AnimatedTextSwitch>
                    </View>
                </ScrollView>
            );
        }

        if (this.quotes.length === 0 ) {
            return (
                <ScrollView style={styles.container}>
                    <View style={[styles.quoteContainer, {paddingBottom:50}]}>
                        <AnimatedTextSwitch style={pullQuoteTextStyle}>
                            No favorites yet
                        </AnimatedTextSwitch>
                    </View>
                </ScrollView>
            );
        }

        let quote = this.state.quote;
        let pullQuote = quote.pullquote;
        let author = quote.author;
        let category = quote.category;
        let id = quote.id;
        let quoteText = quote.quote.replace(/\$/g, "\n\n");

        return (
            <ScrollView style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={numFavsTextStyle}>Favorite {this.state.currentQuoteIndex+1} of {this.quotes.length}</Text>
                    <AnimatedHeart quoteId={id} isFavorite={this.state.isFavorite} toggleFavorite={ async (value) => {
                        await Quotes.setIsFavorite(id, value ? 1 : 0);
                        this.setState({isFavorite:value});
                    }}/>
                </View>

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
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }

}