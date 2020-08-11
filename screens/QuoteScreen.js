import React, {useState} from 'react';
import {
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    ScrollView, TouchableOpacity, Text, Linking,
} from 'react-native';
import AnimatedTextSwitch from '../components/AnimatedTextSwitch';
import Colors from '../constants/Colors';
import { inject, observer } from 'mobx-react';
import styles from '../styles/main';
import HeaderBackground from "../components/HeaderBackground";
import AnimatedHeart from "../components/AnimatedHeart";
import {AntDesign} from "@expo/vector-icons";
import {LightenDarkenColor} from "../Utils";
import _ from 'lodash'
import {Button} from "react-native-elements";
import * as WebBrowser from "expo-web-browser";

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

const HeaderTitle = (props) => {
    return (
        <View style={{
            paddingBottom:10,
            flex: 1,
            textAlign:'center',
            alignSelf: 'center'
        }}>
            <Text style={{
                fontSize:17,
                textAlign:'center',
                fontWeight: "600",
                color:Colors.tintColor
            }}>Daily</Text>
            <Text style={{
                fontSize:17,
                textAlign:'center',
                fontWeight: "600",
                color:Colors.tintColor
            }}>Inspiration</Text>
        </View>
    );
};

@inject('observableStore')
@observer
export default class QuoteScreen extends React.Component {


    static navigationOptions = {
        headerTitle: (props) => <HeaderTitle {...props} />,
        headerTintColor: Colors.tintColor,
        headerTitleStyle :{textAlign: 'center', alignSelf:'center', flex:1},
        headerBackground: <HeaderBackground/>
    };

    constructor(props) {
        super(props);
        this.state = {
            isFavorite:false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('didFocus', () => {
            const index = _.get(this, 'props.navigation.state.params.quoteIndex', false);
            if (index) {
                const quote = this.props.observableStore.quotes.find(({id}) => id === index);
                this.setState({ quote: quote, isFavorite:quote.favorite === 1 });
            }
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    handleClick() {
        this.props.observableStore.randomQuote();
    }

    handlePressSource = (source) => {
        WebBrowser.openBrowserAsync(source);
    };

    render() {

        let quotesLength = this.props.observableStore.quotes.length;
        let currentIndex = this.props.observableStore.currentQuoteIndex;
        let quote = this.props.observableStore.quotes[currentIndex];
        let favorite = this.props.observableStore.quotes[currentIndex].favorite;
        let adjustedFontSize = this.props.observableStore.adjustedFontSize;
        let baseFontFamily = this.props.observableStore.baseFontFamily;
        let skipAnimation = _.get(this.props, 'navigation.state.params.skipAnimation', false);


        // combined font props from store with global styles
        let quoteTextStyle = StyleSheet.flatten([styles.quoteText, {
            fontSize: adjustedFontSize,
            fontFamily: baseFontFamily,
            padding: 20,
            paddingTop: 0
        }]);

        let pullQuoteTextStyle = StyleSheet.flatten([styles.quoteText, {
            fontSize: adjustedFontSize*1.3,
            fontFamily: baseFontFamily,
            fontStyle: 'italic',
            textAlign: "center",
            marginBottom: 20,
            padding: 20,
            paddingTop:10
        }]);

        let explanationTextStyle = StyleSheet.flatten([styles.explanationText, {
            fontSize: adjustedFontSize,
            fontFamily: baseFontFamily,
        }]);

        if (this.props.observableStore.quotes == null) {
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

        if (quotesLength === 0) {
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

        let pullQuote = quote.pullquote;
        let author = quote.author;
        let id = quote.id;
        let source = quote.source;
        //let quoteText = quote.quote.replace(/\$/g, "\n\n");
        let quoteText = quote.quote;

        console.log(quoteText);

        let authorBlock = null;

        if (author != '') {
            if (source != '') {
                authorBlock =
                    <AnimatedTextSwitch style={{...styles.quoteSource}} skipAnimation>
                        <Text onPress={() => {
                            this.handlePressSource(source)
                        }}>by {author} (press to see source)</Text>
                    </AnimatedTextSwitch>
            }
            else {
                authorBlock =
                    <AnimatedTextSwitch style={{...styles.quoteAuthor}} skipAnimation>
                        by {author}
                    </AnimatedTextSwitch>
            }
        }

        return (
            <ScrollView style={styles.container}>

                <View style={{
                    flex:1,
                    flexDirection:"row",
                    justifyContent:"space-between"
                }}>
                    <Explanation textStyle={explanationTextStyle}/>
                    <AnimatedHeart skipAnimation quoteId={id} isFavorite={favorite} toggleFavorite={ async (value) => {
                        await this.props.observableStore.setFavorite(id, value)
                    }}/>
                </View>


                <TouchableWithoutFeedback onPress={ this.handleClick }>
                    <View style={[styles.quoteContainer, {paddingBottom:50}]}>
                        <AnimatedTextSwitch style={pullQuoteTextStyle} skipAnimation>
                            {pullQuote}
                        </AnimatedTextSwitch>
                        <AnimatedTextSwitch style={quoteTextStyle} skipAnimation>
                            {quoteText}
                        </AnimatedTextSwitch>
                        {authorBlock}
                        { __DEV__ ?
                            <AnimatedTextSwitch style={{...styles.quoteAuthor}} skipAnimation>
                                {currentIndex}
                            </AnimatedTextSwitch> : null
                        }
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}