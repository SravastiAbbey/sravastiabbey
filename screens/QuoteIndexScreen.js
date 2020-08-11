import React from 'react';
import {StyleSheet, Image, Text, View, FlatList, ScrollView, Dimensions, Platform} from 'react-native';
import {Input} from 'react-native-elements';
import Touchable from 'react-native-platform-touchable';
import Colors from '../constants/Colors';
import Heart from '../components/Heart';
import {inject, observer} from "mobx-react";
import HeaderBackground from "../components/HeaderBackground";
import {CheckBox} from 'react-native-elements';

const QuoteIndexItem = ({quote, onPress,observableStore}) => {

    const handlePress = function() {
        onPress(quote.id);
    }

    return (
        <Touchable
            style={styles.option}
            background={Touchable.Ripple('#ccc', false)}
            onPress={handlePress}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={styles.optionIconContainer}>
                    <Heart isFavorite={quote.favorite} toggleFavorite={ async (value) => {
                        await observableStore.setFavorite(quote.id, value)
                    }}/>
                </View>
                <View style={{
                    marginRight:10,
                    flex: 1
                }}>
                    <Text style={styles.optionText}>
                        {quote.pullquote}
                    </Text>
                    {  __DEV__ ?
                        <Text style={{
                            textAlign:"right",
                            color:"lightgray"
                        }}>{quote.id}</Text> : null
                    }
                </View>
            </View>
        </Touchable>
    )
}


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
            }}>Quote</Text>
            <Text style={{
                fontSize:17,
                textAlign:'center',
                fontWeight: "600",
                color:Colors.tintColor
            }}>Index</Text>
        </View>
    );
};

@inject('observableStore')
@observer
export default class QuoteIndexScreen extends React.Component {

    state = {
        searchValue: null,
        filteredQuotes: [],
        favorites: false
    }

    constructor(props) {
        super(props);
        let quotes = this.props.observableStore.quotes;
        let quotesArray = quotes.toJS();
        this.state.filteredQuotes = quotesArray;    }

    setUnfilteredQuotes() {
        let quotes = this.props.observableStore.quotes;
        let quotesArray = quotes.toJS();
        this.setState({filteredQuotes: quotesArray})
    }

    static navigationOptions = {
        //title: 'Quote Index',
        title: 'Index',
        headerTintColor: Colors.tintColor,
        headerTitleStyle :{textAlign: 'center', alignSelf:'center', flex:1},
        headerTitleContainerStyle: Platform.OS === 'ios' ? null : {
            left: 0, // THIS RIGHT HERE
        },
        headerBackground: <HeaderBackground/>
    };

    handlePress = (quoteId) => {
        const {navigate} = this.props.navigation;
        this.props.observableStore.setCurrentQuoteById(quoteId);
        navigate('Quote', {skipAnimation:true})
    };

    handleChangeSearch(searchValue) {

        this.setState({searchValue: searchValue});

        let quotes = this.props.observableStore.quotes;
        let filteredQuotes = quotes.toJS();

        if (this.state.favorites) {
            filteredQuotes = filteredQuotes.filter( quote => quote.favorite);
        }

        if (searchValue == '' || searchValue === null) {
            this.setState({filteredQuotes})
            return;
        }

        const extractRegex = (search) => new RegExp("(\\S+[-\\s]+\\n?){0,5}("+search+")\\s?(\\S+[-\\s]+\\n?){0,5}", "i")

        console.log("handleChangeSearch, value = " + searchValue + ", searchValue = " + searchValue);

        let searchValueAsNumber = /^\d+$/.test(searchValue) ? parseInt(searchValue) : NaN;

        if (!isNaN(searchValueAsNumber)) {
            console.log("Filtering by search number for ID: " + searchValue);
            filteredQuotes = filteredQuotes.filter((quote) => {
                return searchValueAsNumber === quote.id;
            });
            this.setState({filteredQuotes})
        }
        else if (searchValue.length > 2) {
            console.log("Filtering by search value: " + searchValue);
            filteredQuotes = filteredQuotes.filter((quote) => {
                return quote.quote.toLowerCase().includes(searchValue.toLowerCase())
            });

            filteredQuotes = filteredQuotes.map( quote => {
                let regex = extractRegex(searchValue.toLowerCase());
                let matches = quote.quote.match(regex);
                let match = matches[0].replace(/<i>|<\/i>|<b>|<\/b>|<u>|<\/u>/gi, "");
                match = match.replace(/\n/g, " ");
                    return {
                    id: quote.id,
                    pullquote: `... ${match} ...`,
                    favorite:quote.favorite
                }
            })

            this.setState({filteredQuotes})
        }
        else {
            console.log("No filter...")
            this.setState({filteredQuotes});
        }

    }

    render() {


        if (!this.props.observableStore.quotes) {
            return (
                <ScrollView style={styles.container}>

                    <Text style={styles.optionsTitleText}>
                        Loading...
                    </Text>

                </ScrollView>
            );
        }

        return (

            <ScrollView style={styles.container}>

                <View style={{
                    flex:1,
                    flexDirection: "row",
                    paddingLeft: 10,
                }}>
                    <View style={{
                        flex:1,
                    }}>
                        <Input
                            placeholder='Search...'
                            onChangeText={this.handleChangeSearch.bind(this)}
                            containerStyle={{
                                backgroundColor:'white'
                            }}
                        />
                    </View>
                    <View style={{
                        width: 130
                    }}>
                        <CheckBox
                            containerStyle={{
                                backgroundColor:"white",
                                borderWidth: 0
                            }}
                            title='Favorites'
                            right
                            checked={this.state.favorites}
                            onPress={() => {
                                this.setState({favorites: !this.state.favorites}, () => {
                                    this.handleChangeSearch(this.state.searchValue)
                                })
                            }}
                        />
                    </View>
                </View>


                <Text style={styles.optionsTitleText}>
                    {this.state.filteredQuotes.length} Quotes
                </Text>

                <FlatList
                    data={this.state.filteredQuotes}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({item, index}) => (
                        <QuoteIndexItem
                            onPress={this.handlePress}
                            quote={item}
                            observableStore={this.props.observableStore}
                        />
                    )}
                />

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: 'white'
    },
    optionsTitleText: {
        fontSize: 16,
        marginLeft: 15,
        marginTop: 9,
        marginBottom: 12,
        textAlign: 'center',
        backgroundColor: 'white'
    },
    optionIconContainer: {
        marginRight: 9,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EDEDED',
        flex: 1
    },
    optionText: {
        fontSize: 15,
        marginTop: 1,
    },
});