import React, {useState} from 'react';
import {
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    ScrollView, TouchableOpacity, Text,
} from 'react-native';
import AnimatedTextSwitch from '../components/AnimatedTextSwitch';
import Colors from '../constants/Colors';
import { inject, observer } from 'mobx-react';
import styles from '../styles/main';
import HeaderBackground from "../components/HeaderBackground";
import quotesManager from '../Libraries/Quotes';
import Quotes from '../Libraries/Quotes';
import AnimatedHeart from "../components/AnimatedHeart";
import {AntDesign} from "@expo/vector-icons";
import {LightenDarkenColor} from "../Utils";

const Explanation = ({textStyle, iconStyle}) => {
    const [isOpen, setIsOpen] = useState(false);

    if (isOpen) {
        return (
            <TouchableOpacity
                onPress={() => {setIsOpen(false)}}
                style={{
                    flex:1,
                    flexDirection:'row',
                    padding:10,
                    paddingTop: 0
                }}
            >
                <Text style={textStyle}>
                    Tap on the screen for a new random quote to inspire your Dharma practice.
                </Text>
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity
                onPress={() => {setIsOpen(true)}}
                style={{
                    flex:1,
                    flexDirection:'row',
                    padding:10,
                }}>
                <AntDesign
                    name={"questioncircleo"}
                    size={22}
                    color={LightenDarkenColor(Colors.gray, 30)}
                    style={iconStyle}
                />
            </TouchableOpacity>
        )
    }

};


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
    await quotesManager.initializeAllQuotes();
    this.quotes = quotesManager.data;
    if (this.quotes && this.quotes.length > 0) {
        this.nextQuote();
    }
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

      let explanationTextStyle = StyleSheet.flatten([styles.explanationText, {
          fontSize: store.adjustedFontSize,
          fontFamily: store.baseFontFamily,
      }]);

    if (this.quotes == null) {
        return (
            <ScrollView style={styles.container}>
                <TouchableWithoutFeedback>
                    <View style={[styles.quoteContainer, {paddingBottom:50}]}>
                        <AnimatedTextSwitch style={pullQuoteTextStyle}>
                            Error loading quotes.
                        </AnimatedTextSwitch>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }

    if (this.quotes.length === 0) {
        return (
            <ScrollView style={styles.container}>
                <TouchableWithoutFeedback>
                    <View style={[styles.quoteContainer, {paddingBottom:50}]}>
                        <AnimatedTextSwitch style={pullQuoteTextStyle}>
                            No quotes found.
                        </AnimatedTextSwitch>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }

    console.log("Num quotes to render = " + this.quotes.length);

    let quote = this.state.quote;

    console.log(this.state);

    let pullQuote = quote.pullquote;
    let author = quote.author;
    let category = quote.category;
    let id = quote.id;
    let quoteText = quote.quote.replace(/\$/g, "\n\n");

    return (
      <ScrollView style={styles.container}>

          <View style={{
              flex:1,
              flexDirection:"row",
              justifyContent:"space-between"
          }}>
              <Explanation textStyle={explanationTextStyle}/>
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

  static navigationOptions = {
    title: 'Quote',
    headerTintColor: Colors.tintColor,
    headerTitleStyle :{textAlign: 'center', alignSelf:'center', flex:1},
    headerBackground: <HeaderBackground/>
  };
}